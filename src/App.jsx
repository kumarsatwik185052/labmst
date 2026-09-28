import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "./auth";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Unauthorized";
import api from "./api";
import "./App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    const token = login(username, password);

    if (!token) {
      setMessage("Invalid username or password");
      return;
    }

    localStorage.setItem("token", token);

    const user = jwtDecode(token);

    setMessage(`Login successful! Welcome ${user.username}`);

    window.location.href = "/dashboard";
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>RBAC Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p>{message}</p>

        <hr />

        <p>Admin: admin / 1234</p>
        <p>Viewer: user / 1234</p>
      </div>
    </div>
  );
}

function Profile() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const user = jwtDecode(token);

  return (
    <div className="container">
      <h1>Profile</h1>

      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "viewer"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin-only route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <h1>Admin Panel</h1>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "viewer"]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized */}
        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;