import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../hooks/useStore";
import { resizeImageFile } from "../utils/image";
import { placeholderImage } from "../utils/placeholder";

function CategoryForm({ existing }) {
  const navigate = useNavigate();
  const { addCategory, updateCategory } = useStore();

  const [category, setCategory] = useState({
    categoryName: existing?.name || "",
    description: existing?.description || "",
    image: existing?.image || "",
  });
  const [error, setError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageLoading(true);
    setError("");
    try {
      const image = await resizeImageFile(file, 600);
      setCategory((prev) => ({ ...prev, image }));
    } catch (err) {
      setError(err.message);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const name = category.categoryName.trim();
    if (!name) {
      setError("Please enter a category name.");
      return;
    }

    const data = {
      name,
      description: category.description.trim(),
      image: category.image || placeholderImage(name, 500, 500, name),
    };

    // TODO: call the Spring Boot add/update category API here once it is available.
    const result = existing ? updateCategory(existing.id, data) : addCategory(data);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/admin/categories");
  };

  return (
    <div className="page">
      <div className="panel" style={{ maxWidth: "600px", margin: "auto" }}>
        <h1>{existing ? "Edit Category" : "Add Category"}</h1>

        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Category Name
            <input className="form-input" type="text" name="categoryName" value={category.categoryName} onChange={handleChange} required />
          </label>

          <label className="form-label">
            Description
            <textarea className="form-input" name="description" value={category.description} onChange={handleChange} rows="4" required />
          </label>

          <label className="form-label">
            Category Image
            <input type="file" accept="image/*" onChange={handleImage} style={{ display: "block", marginTop: "8px" }} />
          </label>
          {imageLoading && <p className="muted" style={{ marginTop: "8px" }}>Processing image...</p>}
          {category.image && <img src={category.image} alt="Preview" className="image-preview" />}

          {existing && existing.name !== category.categoryName.trim() && (
            <p className="muted" style={{ marginTop: "12px", fontSize: "14px" }}>
              Products in “{existing.name}” will be moved to the new name.
            </p>
          )}

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-block" style={{ marginTop: "20px" }} disabled={imageLoading}>
            {existing ? "Save Changes" : "Add Category"}
          </button>
          <Link to="/admin/categories" className="btn btn-outline btn-block" style={{ marginTop: "10px" }}>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

function AddCategory() {
  const { id } = useParams();
  const { categories } = useStore();

  if (id === undefined) return <CategoryForm key="new" />;

  const existing = categories.find((c) => String(c.id) === id);
  if (!existing) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Category not found</h2>
          <Link to="/admin/categories" className="btn">Back to Categories</Link>
        </div>
      </div>
    );
  }

  return <CategoryForm key={existing.id} existing={existing} />;
}

export default AddCategory;
