import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, Loader2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

interface PasswordProtectionGateProps {
  children: React.ReactNode;
}

export default function PasswordProtectionGate({ children }: PasswordProtectionGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "1";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a brief secure check delay
    setTimeout(() => {
      if (email.trim() === "shwetchourey0@gmail.com" && password === "HtmlMeta@07") {
        sessionStorage.setItem("admin_auth", "1");
        setIsAuthenticated(true);
        toast.success("Access Granted. Welcome back, Admin!");
      } else {
        toast.error("Access Denied. Invalid credentials.");
      }
      setLoading(false);
    }, 600);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#08080C] text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-fuchsia-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#0E0E14]/60 border border-border/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Protected Workspace
          </h1>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            This deployment is private. Please authenticate using the Administrator credentials to access the creator suite.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">Admin Email</Label>
            <Input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 text-xs bg-muted/20 border-border/60 focus:border-violet-500 rounded-xl"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">Security Key / Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 text-xs bg-muted/20 border-border/60 focus:border-violet-500 rounded-xl pr-10"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 mt-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white font-bold text-xs shadow-lg shadow-violet-500/20 rounded-xl transition-all duration-300 gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Unlock Workspace"
            )}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground border-t border-border/30 pt-4">
          <ShieldAlert className="h-3 w-3 text-violet-400" />
          <span>Restricted Admin Workspace</span>
        </div>
      </div>
    </div>
  );
}
