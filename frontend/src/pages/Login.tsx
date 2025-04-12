import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import Logo from "../assets/img/trustchecklogo.svg"; // adjust path if needed

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // include cookies/session
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        onLogin();
        navigate("/dashboard");
      } else {
        console.error("Login failed:", {
          status: response.status,
          data,
        });
        setError(data.message || "Login failed");
      }
      
    } catch (err: any) {
      console.error("Login error:", err);
    
      // If error has a response, it might be a FetchError or similar
      if (err.response) {
        console.error("Status:", err.response.status);
        err.response.json().then((json: any) => {
          console.error("Response JSON:", json);
        });
      }
    
      setError("Something went wrong. Please try again.");
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src={Logo} alt="logo" />
      </div>

      <div className="auth-card">
        <h2>Log In</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group remember-forgot">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <Link to={"/signup"} className="signup-link">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
