import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products, categories } = useStore();
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#f5f5f5",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "0.04em" }}>
          NEW COLLECTION 2026
        </h1>
        <h3 style={{ marginTop: "10px", fontWeight: 400, color: "#444" }}>
          Premium Fashion Store
        </h3>

        <Link to="/products" className="btn" style={{ marginTop: "24px", padding: "12px 28px" }}>
          Shop Now
        </Link>
      </section>

      {/* Categories */}
      <section style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center" }}>Shop By Category</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              style={{
                width: "200px",
                height: "120px",
                backgroundColor: "#eeeeee",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "10px",
                textDecoration: "none",
                color: "#111",
              }}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center" }}>Featured Products</h2>

        <div className="container grid" style={{ marginTop: "30px" }}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to="/products" className="btn btn-outline">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
