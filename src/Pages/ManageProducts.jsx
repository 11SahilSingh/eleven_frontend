import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";
import { formatPrice } from "../utils/format";

function ManageProducts() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useStore();
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();
  const visible = products.filter(
    (p) =>
      !term ||
      [p.name, p.category, p.brand, String(p.id)]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
  );

  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="toolbar">
          <h1>Manage Products</h1>
          <Link to="/admin/add-product" className="btn">+ Add Product</Link>
        </div>

        <input
          className="form-input"
          type="search"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "320px", marginTop: 0, marginBottom: "20px" }}
        />

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((product) => (
                <tr key={product.id}>
                  <td><img src={product.image} alt="" className="table-thumb" /></td>
                  <td>
                    <Link to={`/product/${encodeURIComponent(product.id)}`}>{product.name}</Link>
                  </td>
                  <td>{product.category || "—"}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td style={{ color: Number(product.stock) <= 5 ? "#d62828" : undefined }}>
                    {product.stock ?? "—"}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => navigate(`/admin/edit-product/${encodeURIComponent(product.id)}`)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }} className="muted">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
