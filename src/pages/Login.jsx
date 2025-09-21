// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ added Link
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://o3-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // ✅ Save tokens & user info correctly
      localStorage.setItem("token", data.token.token); // access token
      localStorage.setItem("refreshToken", data.token.refreshToken); // refresh token
      localStorage.setItem("user", JSON.stringify(data.token.user));

      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard"); // ✅ redirect to dashboard
      }, 1200);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #0A7075 0%, #032F30 100%)" }}
    >
      <Toaster position="top-right" />
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* ✅ Register link added properly */}
        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none fw-bold text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
