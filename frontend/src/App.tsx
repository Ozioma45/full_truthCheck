import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuickCheck from "./pages/QuickCheck";
import Quickcheckresult from "./pages/Quickcheckresult";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleTranslateProvider from "./providers/GoogleTranslateProvider";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingSession, setCheckingSession] = useState<boolean>(true);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  // Check session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/sessions", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Session fetch failed");

        const data = await response.json();
        const currentSession = data.find((session: any) => session.isCurrent);

        if (currentSession) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  if (checkingSession) {
    return <div>Loading...</div>; // Optional loading spinner while checking
  }

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Sidebar onLogout={logout} />}
        <div className={`content-area ${!isAuthenticated ? "full-width" : ""}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login onLogin={login} />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/signup" element={<Signup onSignup={login} />} />
           <Route path="/quick-check/result" element={<Quickcheckresult />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quick-check"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <QuickCheck />
                </ProtectedRoute>
              }
            />


            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      <GoogleTranslateProvider />
    </Router>
  );
};

export default App;
