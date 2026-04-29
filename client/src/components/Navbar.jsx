import { Briefcase, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Navbar Component
 * Navigation bar with links to Dashboard and Profile pages
 */
const Navbar = ({ currentPage, onNavigate }) => {
  const { user, signOut } = useAuth();
  const label = user?.isAnonymous
    ? "Guest session"
    : user?.displayName?.trim() ||
      user?.email ||
      "Signed in";

  return (
    <header className="w-full bg-surface border-b border-border">
      <div className="max-w-5xl mx-auto px-6 min-h-20 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-primary">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary text-secondary-foreground shrink-0">
            <Briefcase className="w-5 h-5 shrink-0" strokeWidth={2} />
          </div>
          <span className="font-headings font-bold text-lg tracking-tight">
            Job Tracker &amp; Referral Assistant
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <span
            className="text-xs sm:text-sm text-muted-foreground font-body max-w-[200px] truncate"
            title={user?.email || ""}
          >
            {label}
          </span>
          <nav className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate("dashboard")}
              className={`px-5 py-2 rounded-full text-sm font-medium font-body transition-colors ${
                currentPage === "dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-neutral-bg"
              }`}
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => onNavigate("profile")}
              className={`px-5 py-2 rounded-full text-sm font-medium font-body transition-colors ${
                currentPage === "profile"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-neutral-bg"
              }`}
            >
              Profile
            </button>
            <button
              type="button"
              onClick={() => signOut()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium font-body text-muted-foreground border border-border hover:bg-neutral-bg transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4 shrink-0" strokeWidth={2} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
