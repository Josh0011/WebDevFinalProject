import React from "react";
import { Link } from "react-router-dom";

const Login = () => (
  <div className="login">
    <h1>Login</h1>
    <form>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <Link to="/register">Register</Link>
  </div>
);

export default Login;