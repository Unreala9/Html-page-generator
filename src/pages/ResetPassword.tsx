import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  nhost,
  onAuthStateChanged,
  signOut,
} from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff, Layers, Loader2, ShieldCheck } from "lucide-react";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sessionReady, setSessionReady] = useState(false);
  const [expired, setExpired] = useState(false);

  /* ── Detect recovery session ── */
  useEffect(() => {
    // In Nhost the reset-password link redirects to this page and exchanges the
    // token automatically. We watch onAuthStateChanged for a session.
    const session = nhost.getUserSession();
    if (session) {
      setSessionReady(true);
    } else {
      const unsubscribe = onAuthStateChanged((newSession) => {
        if (newSession) setSessionReady(true);
      });

      // If no session after 3 seconds, treat as expired
      const timer = setTimeout(() => {
        if (!nhost.getUserSession()) setExpired(true);
      }, 3000);

      return () => {
        unsubscribe();
        clearTimeout(timer);
      };
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const pwResult = passwordSchema.safeParse(password);
    if (!pwResult.success)
      newErrors.password = pwResult.error.errors[0].message;
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // nhost v4: changeUserPassword throws FetchError on failure
      await nhost.auth.changeUserPassword({ newPassword: password });
      toast.success("Password updated successfully! 🎉 Please sign in.", {
        duration: 5000,
      });
      await signOut();
      navigate("/auth");
    } catch (err) {
      const body = (err instanceof Error &&
        (err as Error & { body?: unknown }).body) as
        | Record<string, unknown>
        | undefined;
      const msg =
        (body?.message as string) ||
        (err instanceof Error ? err.message : "Something went wrong");
      toast.error(
        msg || "Failed to update password. Please request a new reset link.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ── Expired / invalid link ── */
  if (expired) {
    return (
      <div className="auth-page">
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
        <div className="auth-card" style={{ textAlign: "center", gap: "1rem" }}>
          <div
            className="auth-logo"
            style={{ background: "hsl(var(--destructive))" }}
          >
            <ShieldCheck size={20} />
          </div>
          <h1 className="auth-title" style={{ fontSize: "1.3rem" }}>
            Link Expired
          </h1>
          <p className="auth-subtitle" style={{ marginBottom: 0 }}>
            This password reset link has expired or is invalid.
            <br />
            Please request a new one.
          </p>
          <button
            className="auth-btn-primary"
            style={{ marginTop: "0.5rem" }}
            onClick={() => navigate("/auth")}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  /* ── Loading / waiting for session ── */
  if (!sessionReady) {
    return (
      <div className="auth-page">
        <div
          className="auth-card"
          style={{ alignItems: "center", gap: "1rem", padding: "3rem 2rem" }}
        >
          <Loader2
            size={32}
            className="auth-spin"
            style={{ color: "hsl(var(--primary))" }}
          />
          <p className="auth-subtitle" style={{ margin: 0 }}>
            Verifying reset link...
          </p>
        </div>
      </div>
    );
  }

  /* ── Main reset form ── */
  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card">
        <div className="auth-logo">
          <ShieldCheck size={20} />
        </div>

        <h1 className="auth-title">Set New Password</h1>
        <p className="auth-subtitle">
          Choose a strong password for your account
        </p>

        <div className="auth-form">
          {/* New Password */}
          <div className="auth-field">
            <label className="auth-label">New Password</label>
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
                onKeyDown={(e) => e.key === "Enter" && handleReset()}
                disabled={loading}
                autoFocus
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

          {/* Confirm Password */}
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
                onKeyDown={(e) => e.key === "Enter" && handleReset()}
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

          {/* Password strength hint */}
          <p className="auth-resend" style={{ textAlign: "left" }}>
            Minimum 6 characters required
          </p>

          <button
            className="auth-btn-primary"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? (
              <span className="auth-btn-loader">
                <Loader2 size={16} className="auth-spin" />
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </button>

          <button
            className="auth-btn-outline"
            onClick={() => navigate("/auth")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
