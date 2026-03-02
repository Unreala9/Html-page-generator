import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { nhost, onAuthStateChanged } from "@/integrations/supabase/client";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // Check current session synchronously
    const session = nhost.getUserSession();
    setIsAuthed(!!session);
    setChecking(false);

    // Also subscribe to future auth state changes
    const unsubscribe = onAuthStateChanged((newSession) => {
      setIsAuthed(!!newSession);
    });

    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center text-muted-foreground">
        Checking session…
      </div>
    );
  }

  return isAuthed ? <>{children}</> : <Navigate to="/auth" replace />;
}
