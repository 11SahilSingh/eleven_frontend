import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../hooks/useStore";
import { resizeImageFile } from "../utils/image";
import { placeholderImage } from "../utils/placeholder";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  stock: "",
  sizes: ["S", "M", "L", "XL"],
  color: "",
  image: "",
};

function ProductForm({ existing }) {
  const navigate = useNavigate();
  const { categories, addProduct, updateProduct } = useStore();

  const [product, setProduct] = useState(() =>
    existing
      ? {
          ...emptyProduct,
          ...existing,
          price: String(existing.price ?? ""),
          stock: String(existing.stock ?? ""),
          sizes: existing.sizes || [],
        }
      : emptyProduct
  );
  const [error, setError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const toggleSize = (size) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageLoading(true);
    setError("");
    try {
      const image = await resizeImageFile(file);
      setProduct((prev) => ({ ...prev, image }));
    } catch (err) {
      setError(err.message);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const price = Number(product.price);
    const stock = Number(product.stock);
    if (!(price > 0)) {
      setError("Price must be greater than 0.");
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      setError("Stock must be a whole number (0 or more).");
      return;
    }

    const data = {
      ...product,
      name: product.name.trim(),
      brand: product.brand.trim(),
      color: product.color.trim(),
      description: product.description.trim(),
      price,
      stock,
      sizes: SIZE_OPTIONS.filter((s) => product.sizes.includes(s)).concat(
        product.sizes.filter((s) => !SIZE_OPTIONS.includes(s))
      ),
      image: product.image || placeholderImage(product.name.trim(), 600, 700, product.category),
    };

    // TODO: call the Spring Boot add/update product API here once it is available.
    if (existing) updateProduct(existing.id, data);
    else addProduct(data);

    navigate("/admin/products");
  };

  return (
    <div className="page">
      <div className="panel" style={{ maxWidth: "700px", margin: "auto" }}>
        <h1>{existing ? "Edit Product" : "Add Product"}</h1>

        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Product Name
            <input className="form-input" type="text" name="productName" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
          </label>

          <label className="form-label">
            Description
            <textarea className="form-input" name="description" value={product.description} onChange={handleChange} rows="4" required />
          </label>

          <div className="form-row">
            <label className="form-label">
              Price (₹)
              <input className="form-input" type="number" name="price" min="1" step="1" value={product.price} onChange={handleChange} required />
            </label>
            <label className="form-label">
              Stock Quantity
              <input className="form-input" type="number" name="stock" min="0" step="1" value={product.stock} onChange={handleChange} required />
            </label>
          </div>

          <div className="form-row">
            <label className="form-label">
              Category
              <select className="form-input" name="category" value={product.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
                {product.category && !categories.some((c) => c.name === product.category) && (
                  <option value={product.category}>{product.category}</option>
                )}
              </select>
            </label>
            <label className="form-label">
              Brand
              <input className="form-input" type="text" name="brand" value={product.brand} onChange={handleChange} required />
            </label>
          </div>

          <label className="form-label">
            Color
            <input className="form-input" type="text" name="color" value={product.color} onChange={handleChange} required />
          </label>

          <div className="form-label">
            Sizes
            <div className="checkbox-row">
              {SIZE_OPTIONS.concat(product.sizes.filter((s) => !SIZE_OPTIONS.includes(s))).map((size) => (
                <label key={size}>
                  <input type="checkbox" checked={product.sizes.includes(size)} onChange={() => toggleSize(size)} />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <label className="form-label">
            Product Image
            <input type="file" accept="image/*" onChange={handleImage} style={{ display: "block", marginTop: "8px" }} />
          </label>
          {imageLoading && <p className="muted" style={{ marginTop: "8px" }}>Processing image...</p>}
          {product.image && <img src={product.image} alt="Preview" className="image-preview" />}

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-block" style={{ marginTop: "20px" }} disabled={imageLoading}>
            {existing ? "Save Changes" : "Add Product"}
          </button>
          <Link to="/admin/products" className="btn btn-outline btn-block" style={{ marginTop: "10px" }}>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

function AddProduct() {
  const { id } = useParams();
  const { products } = useStore();

  if (id === undefined) return <ProductForm key="new" />;

  const existing = products.find((p) => String(p.id) === id);
  if (!existing) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Product not found</h2>
          <Link to="/admin/products" className="btn">Back to Products</Link>
        </div>
      </div>
    );
  }

  return <ProductForm key={existing.id} existing={existing} />;
}

export default AddProduct;
