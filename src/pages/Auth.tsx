import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nhost, onAuthStateChanged, gql } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff, Layers, ArrowLeft, Loader2 } from "lucide-react";
import { z } from "zod";

/* ─── Validation Schemas ─── */
const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

type View = "signin" | "signup" | "forgot";

// Extract a human-readable message from a nhost v4 FetchError
function getAuthErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    const body = (err as Error & { body?: unknown }).body as
      | Record<string, unknown>
      | undefined;
    if (body) {
      const errObj = body.error as { message?: string } | undefined;
      if (errObj?.message) return errObj.message.toLowerCase();
      if (typeof body.message === "string") return body.message.toLowerCase();
    }
    return (err.message || "").toLowerCase();
  }
  return String(err).toLowerCase();
}

export default function Auth() {
  const navigate = useNavigate();

  /* ── View state ── */
  const [view, setView] = useState<View>("signin");

  /* ── Form fields ── */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  /* ── UI state ── */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ── Field errors ── */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ── Redirect if already logged in ── */
  useEffect(() => {
    const session = nhost.getUserSession();
    if (session) navigate("/");

    // Listen for session changes
    const unsubscribe = onAuthStateChanged((_session) => {
      if (_session) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  /* ── Clear errors & fields on view switch ── */
  const switchView = (v: View) => {
    setErrors({});
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirm(false);
    setView(v);
  };

  /* ── Field-level validation ── */
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const emailResult = emailSchema.safeParse(email.trim());
    if (!emailResult.success)
      newErrors.email = emailResult.error.errors[0].message;

    if (view !== "forgot") {
      const pwResult = passwordSchema.safeParse(password);
      if (!pwResult.success)
        newErrors.password = pwResult.error.errors[0].message;
    }

    if (view === "signup") {
      if (!fullName.trim()) newErrors.fullName = "Full name is required";
      if (password !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ─────────────────── SIGN IN ───────────────── */
  const handleSignIn = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // nhost v4: throws FetchError on invalid credentials
      await nhost.auth.signInEmailPassword({
        email: email.trim(),
        password,
      });

      const session = nhost.getUserSession();

      // Ensure they exist in the approvals table
      if (session?.user) {
        try {
          await gql(
            `mutation InsertUserApproval($userId: uuid!, $email: String!) {
              insert_user_approvals_one(
                object: { user_id: $userId, email: $email, status: "pending" },
                on_conflict: { constraint: user_approvals_user_id_key, update_columns: [] }
              ) {
                id
              }
            }`,
            { userId: session.user.id, email: session.user.email }
          );
        } catch (e) {
          console.error("Failed to sync approval state:", e);
        }
      }

      // withClientSideSessionMiddleware auto-saves the session
      toast.success("Welcome back! 👋");
      navigate("/");
    } catch (err) {
      const msg = getAuthErrorMessage(err);
      if (
        msg.includes("invalid") ||
        msg.includes("credentials") ||
        msg.includes("password")
      ) {
        toast.error(
          '❌ Wrong email or password.\n\nNew here? Click "Create account" below to sign up.',
          { duration: 7000 },
        );
      } else if (
        msg.includes("unverified") ||
        msg.includes("confirmed") ||
        msg.includes("verify")
      ) {
        toast.error(
          "Please verify your email first! Check your inbox (and spam folder).",
          { duration: 6000 },
        );
      } else {
        toast.error(msg || "Sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────── SIGN UP ───────────────── */
  const handleSignUp = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // nhost v4: throws FetchError if email already exists or other errors
      // Note: redirectTo is NOT allowed on signup — set it in Nhost dashboard → Auth → Sign-In → Allowed URLs
      await nhost.auth.signUpEmailPassword({
        email: email.trim(),
        password,
        options: {
          displayName: fullName.trim(),
        },
      });

      const session = nhost.getUserSession();

      // Ensure they exist in the approvals table
      if (session?.user) {
        try {
          await gql(
            `mutation InsertUserApproval($userId: uuid!, $email: String!) {
              insert_user_approvals_one(
                object: { user_id: $userId, email: $email, status: "pending" },
                on_conflict: { constraint: user_approvals_user_id_key, update_columns: [] }
              ) {
                id
              }
            }`,
            { userId: session.user.id, email: session.user.email }
          );
        } catch (e) {
          console.error("Failed to sync approval state:", e);
        }
      }

      toast.success(
        `Account created! 🎉 Check your inbox at ${email.trim()} and click the confirmation link.`,
        { duration: 8000 },
      );
      setEmail("");
      setFullName("");
      switchView("signin");
    } catch (err) {
      const msg = getAuthErrorMessage(err);
      if (msg.includes("already") || msg.includes("exists")) {
        toast.error("This email is already registered. Sign in instead.");
      } else {
        toast.error(msg || "Sign up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────── FORGOT PASSWORD ───────────────── */
  const handleForgotPassword = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await nhost.auth.sendPasswordResetEmail({
        email: email.trim(),
        options: {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      });
      toast.success("Reset link sent! 📧 Check your inbox and spam folder.", {
        duration: 6000,
      });
      switchView("signin");
    } catch (err) {
      toast.error(
        getAuthErrorMessage(err) || "Failed to send reset email. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (view === "signin") handleSignIn();
    else if (view === "signup") handleSignUp();
    else handleForgotPassword();
  };

  /* ─────────────────── UI HELPERS ─────────────────── */
  const titles: Record<View, string> = {
    signin: "Welcome Back",
    signup: "Create Account",
    forgot: "Reset Password",
  };
  const subtitles: Record<View, string> = {
    signin: "Sign in to manage your landing pages",
    signup: "Fill in the details to get started",
    forgot: "Enter your email and we'll send a reset link",
  };
  const submitLabels: Record<View, string> = {
    signin: "Sign In",
    signup: "Create Account",
    forgot: "Send Reset Link",
  };

  return (
    <div className="auth-page">
      {/* Background blobs */}
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <Layers size={22} />
        </div>

        {/* Back button for forgot password */}
        {view === "forgot" && (
          <button
            className="auth-back"
            onClick={() => switchView("signin")}
            disabled={loading}
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </button>
        )}

        {/* Title */}
        <h1 className="auth-title">{titles[view]}</h1>
        <p className="auth-subtitle">{subtitles[view]}</p>

        {/* ── Form ── */}
        <div className="auth-form">
          {/* Full Name — signup only */}
          {view === "signup" && (
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <input
                className={`auth-input ${errors.fullName ? "auth-input-error" : ""}`}
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName)
                    setErrors((p) => {
                      const n = { ...p };
                      delete n.fullName;
                      return n;
                    });
                }}
                disabled={loading}
                autoFocus
              />
              {errors.fullName && (
                <span className="auth-error">{errors.fullName}</span>
              )}
            </div>
          )}

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className={`auth-input ${errors.email ? "auth-input-error" : ""}`}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email)
                  setErrors((p) => {
                    const n = { ...p };
                    delete n.email;
                    return n;
                  });
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={loading}
              autoFocus={view !== "signup"}
            />
            {errors.email && <span className="auth-error">{errors.email}</span>}
          </div>

          {/* Password — not shown on forgot */}
          {view !== "forgot" && (
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <input
                  className={`auth-input ${errors.password ? "auth-input-error" : ""}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((p) => {
                        const n = { ...p };
                        delete n.password;
                        return n;
                      });
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowPassword((p) => !p)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="auth-error">{errors.password}</span>
              )}
            </div>
          )}

          {/* Confirm Password — signup only */}
          {view === "signup" && (
            <div className="auth-field">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-wrap">
                <input
                  className={`auth-input ${errors.confirmPassword ? "auth-input-error" : ""}`}
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((p) => {
                        const n = { ...p };
                        delete n.confirmPassword;
                        return n;
                      });
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowConfirm((p) => !p)}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="auth-error">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {/* Forgot password link — signin only */}
          {view === "signin" && (
            <div className="auth-forgot-row">
              <button
                type="button"
                className="auth-link-sm"
                onClick={() => switchView("forgot")}
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit button */}
          <button
            className="auth-btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="auth-btn-loader">
                <Loader2 size={16} className="auth-spin" />
                Processing...
              </span>
            ) : (
              submitLabels[view]
            )}
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <span />
            <span className="auth-divider-text">
              {view === "signin"
                ? "New here?"
                : view === "signup"
                  ? "Already have an account?"
                  : ""}
            </span>
            <span />
          </div>

          {/* Switch view link */}
          {view === "signin" && (
            <button
              className="auth-btn-outline"
              onClick={() => switchView("signup")}
              disabled={loading}
            >
              Create Account
            </button>
          )}
          {view === "signup" && (
            <button
              className="auth-btn-outline"
              onClick={() => switchView("signin")}
              disabled={loading}
            >
              Sign In Instead
            </button>
          )}

          {/* Resend confirmation — signin only */}
          {view === "signin" && (
            <p className="auth-resend">
              Didn't get a confirmation email?{" "}
              <button
                type="button"
                className="auth-link-sm"
                onClick={async () => {
                  if (!email.trim()) {
                    toast.error("Enter your email above first");
                    return;
                  }
                  try {
                    await nhost.auth.sendVerificationEmail({
                      email: email.trim(),
                      options: { redirectTo: `${window.location.origin}/` },
                    });
                    toast.success(
                      "Confirmation email resent! Check your inbox.",
                    );
                  } catch (err) {
                    toast.error(getAuthErrorMessage(err) || "Failed to resend");
                  }
                }}
                disabled={loading}
              >
                Resend
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
