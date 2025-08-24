import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LoginSignup.css"; // Make sure this matches your CSS file name

export default function LoginSignup() {
  const [active, setActive] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy check (replace with API later)
    if (loginEmail === "admin@example.com" && loginPassword === "1234") {
      localStorage.setItem("auth", "true");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="ls-container">
      <div className={`ls-main-container ${active ? "ls-active" : ""}`}>
        {/* Sign Up Form */}
        <div className="ls-form-container ls-sign-up">
          <form>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="ls-form-container ls-sign-in">
          <form onSubmit={handleLogin}>
            <h1>Log In</h1>
            <span>or use your email password</span>
            <input 
              type="email" 
              placeholder="Email" 
              value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Log In</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className="ls-toggle-container">
          <div className="ls-toggle">
            <div className="ls-toggle-panel ls-toggle-left">
              <h1>Welcome Back!</h1>
              <p>Log in to share your thoughts and connect with fellow writers.</p>
              <button
                type="button"
                className="ls-hidden"
                onClick={() => setActive(false)}
              >
                Log In
              </button>
            </div>
            <div className="ls-toggle-panel ls-toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Create an account to start sharing your texts and explore others'
                work.
              </p>
              <button
                type="button"
                className="ls-hidden"
                onClick={() => setActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}