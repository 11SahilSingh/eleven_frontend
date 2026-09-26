
import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "30px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <Link to="/admin/add-product">
          <div className="card">
            <h2>Add Product</h2>
          </div>
        </Link>

        <Link to="/admin/products">
          <div className="card">
            <h2>Manage Products</h2>
          </div>
        </Link>

        <Link to="/admin/add-category">
          <div className="card">
            <h2>Add Category</h2>
          </div>
        </Link>

        <Link to="/admin/categories">
          <div className="card">
            <h2>Manage Categories</h2>
          </div>
        </Link>

        <Link to="/admin/orders">
          <div className="card">
            <h2>Manage Orders</h2>
          </div>
        </Link>

        <Link to="/admin/users">
          <div className="card">
            <h2>Manage Users</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;

