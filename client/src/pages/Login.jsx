import { useState } from "react";
import "./Login.css";
import characterImage from "../icons/log-in-character.png";
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin?.();
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="login-page">
      {/* Left side - Character image and BridgeTalk header */}
      <div className="login-left">
        <div className="character-section">
          <div className="brand-text">
            <h1 className="main-title">AI Conversational Companion</h1>
            <h2 className="bridge-talk">Bridge Talk</h2>
          </div>
          <img 
            src={characterImage} 
            alt="BridgeTalk Character" 
            className="character-img"
          />
        </div>
      </div>

      {/* Right side - login form */}
      <div className="login-right">
        <div className="login-card">
          {/* Get Started Now heading */}
          <h3 className="get-started-heading">Get Started Now</h3>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                required
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                I agree to the terms & policy
              </label>
            </div>

            <button type="submit" className="sign-up-btn">Log in</button>
          </form>

          <div className="divider">
            <span></span>
          </div>

          <div className="social-buttons">
            <button className="social-btn google-btn">
              Sign in with Google
            </button>
            <button className="social-btn apple-btn">
              Sign in with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}