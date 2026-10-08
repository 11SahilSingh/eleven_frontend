import { startTransition, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";
import { placeholderImage } from "../utils/placeholder";

function UserProfile() {
  const navigate = useNavigate();
  const { currentUser: user, isAdmin, myOrders, logout, updateProfile } = useStore();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [error, setError] = useState("");

  const startEditing = () => {
    setForm({ name: user.name, phone: user.phone || "", address: user.address || "" });
    setError("");
    setEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (form.phone && !/^\+?[\d\s-]{10,15}$/.test(form.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    updateProfile({ name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() });
    setEditing(false);
  };

  const handleLogout = () => {
    // Same transition so the protected-route redirect to /login doesn't win.
    startTransition(() => {
      navigate("/");
      logout();
    });
  };

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="page">
      <div className="panel" style={{ maxWidth: "700px", margin: "auto" }}>
        <div style={{ textAlign: "center" }}>
          <img
            src={placeholderImage(initials, 120, 120, user.email)}
            alt={user.name}
            style={{ width: "120px", height: "120px", borderRadius: "50%", margin: "0 auto 20px" }}
          />
          <h2>{user.name}</h2>
          <p className="muted">{user.email}</p>
          {isAdmin && <span className="status" style={{ marginTop: "8px" }}>Admin</span>}
        </div>

        <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #eee" }} />

        {editing ? (
          <form onSubmit={handleSave}>
            <h3>Edit Profile</h3>
            <label className="form-label">
              Name
              <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label className="form-label">
              Phone
              <input className="form-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </label>
            <label className="form-label">
              Address
              <textarea className="form-input" rows="3" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </label>
            {error && <p className="form-error">{error}</p>}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="submit" className="btn">Save</button>
              <button type="button" className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <h3>Personal Information</h3>
            <p style={{ marginTop: "12px" }}>
              <strong>Phone:</strong> {user.phone || <span className="muted">Not added</span>}
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Address:</strong> {user.address || <span className="muted">Not added</span>}
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Orders:</strong> {myOrders.length}
            </p>
          </div>
        )}

        {!editing && (
          <div style={{ marginTop: "30px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button className="btn btn-outline" onClick={startEditing}>Edit Profile</button>
            <Link to="/orders" className="btn btn-outline">My Orders</Link>
            <Link to="/wishlist" className="btn btn-outline">Wishlist</Link>
            {isAdmin && <Link to="/adminDashboard" className="btn btn-outline">Admin Dashboard</Link>}
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
