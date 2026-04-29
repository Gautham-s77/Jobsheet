import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { Briefcase } from "lucide-react";
import { auth } from "../firebase.js";

const googleProvider = new GoogleAuthProvider();

/**
 * Sign-in / sign-up screen (Google + email/password + guest)
 */
export default function LoginPage() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleGoogle = async () => {
    setError("");
    setBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const handleGuest = async () => {
    setError("");
    setBusy(true);
    try {
      await signInAnonymously(auth);
    } catch (err) {
      setError(err.message || "Guest sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-6 py-12 font-body">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-3 text-primary mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary text-secondary-foreground">
            <Briefcase className="w-7 h-7" strokeWidth={2} />
          </div>
          <h1 className="font-headings font-extrabold text-2xl tracking-tight text-foreground text-center">
            Job Tracker &amp; Referral Assistant
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to access your dashboard and profile.
          </p>
        </div>

        <div className="card space-y-6">
          {error && (
            <div className="rounded-xl border border-border bg-red-50 text-danger text-sm px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="btn-primary w-full justify-center shadow-primary-soft"
          >
            Continue with Google
          </button>

          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGuest}
              disabled={busy}
              className="btn-secondary w-full justify-center border-border"
            >
              Continue as guest
            </button>
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Guest data (jobs and profile) is removed from our servers when you
              sign out.
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <span className="bg-surface px-3 text-xs text-muted-foreground font-medium relative z-10">
              or use email
            </span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="auth-email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
                disabled={busy}
              />
            </div>
            <div>
              <label
                htmlFor="auth-password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
                minLength={6}
                disabled={busy}
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="btn-primary w-full justify-center"
            >
              {mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => {
                    setMode("signin");
                    setError("");
                  }}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Need an account?{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
