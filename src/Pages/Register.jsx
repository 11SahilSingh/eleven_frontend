import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useStore from "../hooks/useStore";

function Register() {
  const location = useLocation();
  const { register, currentUser } = useStore();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const redirectTo = location.state?.from?.pathname || "/";

  if (currentUser) return <Navigate to={redirectTo} replace />;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (user.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // On success the component re-renders and redirects.
    const result = register(user);
    if (!result.ok) setError(result.error);
  };

  return (
    <div className="page" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} className="panel" style={{ width: "100%", maxWidth: "420px" }}>
        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        <input className="form-input" type="text" name="name" placeholder="Full Name" value={user.name} onChange={handleChange} autoComplete="name" required />
        <input className="form-input" type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} autoComplete="email" required />
        <input className="form-input" type="password" name="password" placeholder="Password (min 6 characters)" value={user.password} onChange={handleChange} autoComplete="new-password" required />
        <input className="form-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} autoComplete="new-password" required />

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn btn-block" style={{ marginTop: "20px" }}>
          Register
        </button>

        <p className="form-footer">
          Already have an account? <Link to="/login" state={location.state}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
