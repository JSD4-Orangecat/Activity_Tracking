import { useState } from "react";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "../assets/styles/loginBox.css";
import { useAuth } from "../contexts/authentication";

export default function LoginBox() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="login-fields">
          <h1 className="login-title">Login</h1>
          <div className="username-container">
            <p>email</p>
            <input
              className="username-input-container"
              type="text"
              placeholder="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
          </div>
          <div className="password-container">
            <p>Password</p>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
            </div>
            <p className="password-forget">
              <a href="#">Forgot Password?</a>
            </p>
          </div>
        </div>
        <button className="login-button">Sign In</button>
      </form>
      <button
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      <div className="login-social-container">
        <p>or continue with</p>
        <div className="login-social">
          <button className="login-social-button">
            <FaGoogle />
          </button>
          <button className="login-social-button">
            <FaGithub />
          </button>
          <button className="login-social-button">
            <FaFacebook />
          </button>
        </div>
      </div>

      <div className="login-footer">
        <p>
          Don't have an account yet? <a href="#">Register for free.</a>
        </p>
      </div>
    </div>
  );
}
