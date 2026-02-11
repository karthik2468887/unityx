import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Mail,
  Lock,
  User,
  GraduationCap,
  Award,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { login, signup } from "../services/authService";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(
          formData.name,
          formData.email,
          formData.password,
          formData.role
        );
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-unity">
      <div className="login-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            className="login-card"
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* HEADER */}
            <div className="login-logo">
              <Zap size={54} className="logo-glow" />
              <h2>Unity</h2>
              <p>
                {isLogin
                  ? "Sign in to continue learning"
                  : "Create your learning workspace"}
              </p>
            </div>

            {/* ERROR */}
            {error && <div className="error-message">{error}</div>}

            {/* FORM */}
            <form className="login-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-group">
                  <label>Full Name</label>
                  <div className="input-field-icon">
                    <User size={18} />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-field-icon">
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-field-icon">
                  <Lock size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="input-group">
                  <label>Role</label>
                  <div className="role-selector">
                    <div
                      className={`role-option ${
                        formData.role === "student" ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, role: "student" })
                      }
                    >
                      <GraduationCap size={18} />
                      Student
                      {formData.role === "student" && (
                        <CheckCircle2 size={14} />
                      )}
                    </div>

                    <div
                      className={`role-option ${
                        formData.role === "mentor" ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, role: "mentor" })
                      }
                    >
                      <Award size={18} />
                      Mentor
                      {formData.role === "mentor" && (
                        <CheckCircle2 size={14} />
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn-login"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            {/* FOOTER */}
            <div className="login-footer">
              {isLogin ? "New here? " : "Already have an account? "}
              <span
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
              >
                {isLogin ? "Create account" : "Sign in"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;