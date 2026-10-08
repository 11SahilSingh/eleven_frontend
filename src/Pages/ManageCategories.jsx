import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";

function ManageCategories() {
  const navigate = useNavigate();
  const { categories, products, deleteCategory } = useStore();
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();
  const visible = categories.filter(
    (c) =>
      !term ||
      c.name.toLowerCase().includes(term) ||
      (c.description || "").toLowerCase().includes(term)
  );

  const productCount = (name) => products.filter((p) => p.category === name).length;

  const handleDelete = (category) => {
    const count = productCount(category.name);
    const message = count
      ? `${count} product(s) use "${category.name}". Delete the category anyway? The products will stay but have no matching category.`
      : `Delete "${category.name}"?`;
    if (window.confirm(message)) deleteCategory(category.id);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="toolbar">
          <h1>Manage Categories</h1>
          <Link to="/admin/add-category" className="btn">+ Add Category</Link>
        </div>

        <input
          className="form-input"
          type="search"
          placeholder="Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "320px", marginTop: 0, marginBottom: "20px" }}
        />

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((category) => (
                <tr key={category.id}>
                  <td>{category.image && <img src={category.image} alt="" className="table-thumb" />}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{productCount(category.name)}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => navigate(`/admin/edit-category/${encodeURIComponent(category.id)}`)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }} className="muted">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageCategories;
