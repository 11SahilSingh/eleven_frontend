import { Link, useSearchParams } from "react-router-dom";
import useStore from "../hooks/useStore";
import ProductCard from "../components/ProductCard";
import { API_BASE_URL } from "../api";

const SORTS = {
  featured: { label: "Featured", fn: null },
  "price-asc": { label: "Price: Low to High", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: High to Low", fn: (a, b) => b.price - a.price },
  name: { label: "Name: A to Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

const Products = () => {
  const { products, categories, productSource, productsLoading } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = SORTS[searchParams.get("sort")] ? searchParams.get("sort") : "featured";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const term = search.trim().toLowerCase();
  let visible = products.filter((p) => {
    const matchesCategory =
      !category || (p.category || "").toLowerCase() === category.toLowerCase();
    const matchesSearch =
      !term ||
      [p.name, p.brand, p.category, p.description, p.color]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });
  if (SORTS[sort].fn) visible = [...visible].sort(SORTS[sort].fn);

  const title = category || (search ? "Search Results" : "All Products");

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">{title}</h1>

        {!productsLoading && productSource !== "backend" && (
          <div className="notice">
            Couldn't reach the backend at {API_BASE_URL}, so sample products are shown.
          </div>
        )}

        <div className="toolbar">
          <p className="muted">
            {productsLoading ? "Loading products..." : `${visible.length} products`}
            {search && (
              <>
                {" "}for “{search}” ·{" "}
                <button
                  onClick={() => updateParam("search", "")}
                  style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer", font: "inherit" }}
                >
                  Clear search
                </button>
              </>
            )}
          </p>

          <div className="toolbar-group">
            <select
              className="form-input"
              style={{ marginTop: 0, width: "auto" }}
              value={category}
              onChange={(e) => updateParam("category", e.target.value)}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              className="form-input"
              style={{ marginTop: 0, width: "auto" }}
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value === "featured" ? "" : e.target.value)}
              aria-label="Sort products"
            >
              {Object.entries(SORTS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="empty-state">
            <h3>No products found.</h3>
            <p>Try a different search or category.</p>
            <Link to="/products" className="btn">
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
