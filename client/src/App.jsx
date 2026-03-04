import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ add Navigate
import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Conversation from "./pages/Conversation";
import Login from "./pages/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        {/* Protected routes inside Layout */}
        <Route
          element={
            isLoggedIn ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/conversation" element={<Conversation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}