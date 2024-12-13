import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Success message
    const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_REMOTE_SERVER; // Use Vite's env variable

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      console.log("Registering user with Firebase...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      console.log("Firebase user created:", firebaseUser);

      const userData = {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        role,
      };

      console.log("Sending user data to backend:", userData);

      const response = await axios.post(`${backendUrl}/api/users/register`, userData);

      console.log("Backend response:", response.data);

      // Display success message
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already registered. Please log in instead.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Password must be at least 6 characters long.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }

      console.error("Registration error:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
        <h1 className="text-center mb-4">Register</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="form-text">Password must be at least 6 characters long.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
