import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_REMOTE_SERVER;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Attempting to sign in with Firebase...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      console.log("Firebase user signed in:", firebaseUser);

      const token = await firebaseUser.getIdToken();

      console.log("Sending token to backend for verification...");

      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        { token },
        { withCredentials: true }
      );

      console.log("Backend response:", response.data);

      setSuccessMessage("Login successful! Redirecting to home...");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/");
      }, 2000); 
    } catch (error) {
      let message = "An unexpected error occurred. Please try again.";

      if (error.code === "auth/user-not-found") {
        message = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      }

      setErrorMessage(message);
      setSuccessMessage("");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
        <h1 className="text-center mb-4">Login</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
