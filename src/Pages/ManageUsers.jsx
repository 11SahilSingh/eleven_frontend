import { useState } from "react";
import useStore from "../hooks/useStore";
import { formatDate } from "../utils/format";

function ManageUsers() {
  const { users, orders, currentUser, toggleUserStatus, deleteUser } = useStore();
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();
  const visible = users.filter(
    (u) =>
      !term ||
      [u.name, u.email, u.phone].filter(Boolean).some((field) => field.toLowerCase().includes(term))
  );

  const orderCount = (userId) => orders.filter((o) => o.userId === userId).length;

  const handleDelete = (user) => {
    if (window.confirm(`Delete ${user.name}'s account? This cannot be undone.`)) {
      deleteUser(user.id);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 style={{ marginBottom: "20px" }}>Manage Users</h1>

        <input
          className="form-input"
          type="search"
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "320px", marginTop: 0, marginBottom: "20px" }}
        />

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Orders</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((user) => {
                const isSelf = user.id === currentUser?.id;
                return (
                  <tr key={user.id}>
                    <td>{user.name}{isSelf && <span className="muted"> (you)</span>}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "—"}</td>
                    <td style={{ textTransform: "capitalize" }}>{user.role}</td>
                    <td>{orderCount(user.id)}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{formatDate(user.createdAt)}</td>
                    <td><span className={`status status-${user.status}`}>{user.status}</span></td>
                    <td>
                      {isSelf ? (
                        <span className="muted">—</span>
                      ) : (
                        <div className="table-actions">
                          <button className="btn btn-outline btn-sm" onClick={() => toggleUserStatus(user.id)}>
                            {user.status === "Active" ? "Block" : "Unblock"}
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }} className="muted">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
