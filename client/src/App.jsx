import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useAuth } from "./context/AuthContext.jsx";

/**
 * Main App Component
 * Routes between Dashboard and Profile pages (requires Firebase auth)
 */
function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <Profile />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center font-body text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-[800px] min-h-screen w-full bg-background flex flex-col font-body">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 w-full">{renderPage()}</main>
    </div>
  );
}

export default App;
