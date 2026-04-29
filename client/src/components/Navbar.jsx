import { Briefcase } from "lucide-react";

/**
 * Navbar Component
 * Navigation bar with links to Dashboard and Profile pages
 */
const Navbar = ({ currentPage, onNavigate }) => {
  return (
    <header className="w-full bg-surface border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 text-primary">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary text-secondary-foreground">
            <Briefcase className="w-5 h-5 shrink-0" strokeWidth={2} />
          </div>
          <span className="font-headings font-bold text-lg tracking-tight">
            Job Tracker &amp; Referral Assistant
          </span>
        </div>
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
