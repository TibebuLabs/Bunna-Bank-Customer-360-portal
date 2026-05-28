import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: "monospace", background: "#fff1f0", minHeight: "100vh" }}>
          <h2 style={{ color: "#c0392b" }}>Runtime Error</h2>
          <pre style={{ color: "#333", whiteSpace: "pre-wrap" }}>{this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Demo mode: always allow access — no backend required
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // If no token, set a demo token so visitors can access the dashboard
  if (!token) {
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("user", JSON.stringify({
      id: 1,
      fullName: "Demo User",
      username: "demo",
      role: "officer",
    }));
  }
  return children;
};

export default function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/login"     element={<Login />} />
            <Route path="/register"  element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="*"          element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </LanguageProvider>
  );
}
