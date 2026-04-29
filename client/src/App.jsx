import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import "./index.css";

/**
 * Main App Component
 * Routes between Dashboard and Profile pages
 */
function App() {
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

  return (
    <div className="min-h-[800px] min-h-screen w-full bg-background flex flex-col font-body">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 w-full">{renderPage()}</main>
    </div>
  );
}

export default App;
