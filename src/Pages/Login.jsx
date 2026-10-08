import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useStore from "../hooks/useStore";

function Login() {
  const location = useLocation();
  const { login, currentUser } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo = location.state?.from?.pathname || "/";

  // After a successful login this re-renders and sends the user on.
  if (currentUser) {
    const target = currentUser.role === "admin" && redirectTo === "/" ? "/adminDashboard" : redirectTo;
    return <Navigate to={target} replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) setError(result.error);
  };

  return (
    <div className="page" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleLogin} className="panel" style={{ width: "100%", maxWidth: "380px" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          className="form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn btn-block" style={{ marginTop: "20px" }}>
          Login
        </button>

        <p className="form-footer">
          New to ELEVEN? <Link to="/register" state={location.state}>Create an account</Link>
        </p>
        <p className="form-hint">Demo admin: admin@eleven.com / admin123</p>
      </form>
    </div>
  );
}

export default Login;
