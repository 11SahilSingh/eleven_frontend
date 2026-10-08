import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";
import { placeholderImage } from "../utils/placeholder";

const Categories = () => {
  const { categories, products } = useStore();

  const countFor = (name) =>
    products.filter((p) => (p.category || "").toLowerCase() === name.toLowerCase()).length;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Shop By Category</h1>

        {categories.length === 0 ? (
          <div className="empty-state">
            <h3>No categories yet.</h3>
          </div>
        ) : (
          <div className="grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="category-card"
              >
                <img
                  src={category.image || placeholderImage(category.name, 500, 500)}
                  alt={category.name}
                />
                <div>
                  <h3>{category.name}</h3>
                  <p className="muted" style={{ fontSize: "14px", marginTop: "4px" }}>
                    {countFor(category.name)} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
