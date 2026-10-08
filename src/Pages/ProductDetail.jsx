import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../hooks/useStore";
import ProductCard from "../components/ProductCard";
import { formatPrice } from "../utils/format";
import { placeholderImage } from "../utils/placeholder";

const DEFAULT_SIZES = ["S", "M", "L", "XL"];

const ProductDetailView = ({ product, related }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const sizes = product.sizes?.length ? product.sizes : DEFAULT_SIZES;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const hasStock = product.stock !== undefined && product.stock !== null;
  const stock = hasStock ? Number(product.stock) : Infinity;
  const outOfStock = stock <= 0;
  const wished = isInWishlist(product.id);

  const handleAddToCart = () => addToCart(product, { size: selectedSize, quantity });

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="page" style={{ background: "#fff" }}>
      <div className="container">
        <p className="muted" style={{ marginBottom: "20px", fontSize: "14px" }}>
          <Link to="/products">Products</Link>
          {product.category && (
            <>
              {" / "}
              <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                {product.category}
              </Link>
            </>
          )}
          {" / "}
          {product.name}
        </p>

        <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
          {/* Product Image */}
          <div style={{ flex: "0 1 450px" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "10px" }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = placeholderImage(product.name);
              }}
            />
          </div>

          {/* Product Info */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            {product.brand && <p className="product-card-brand">{product.brand}</p>}
            <h1>{product.name}</h1>
            <h2 style={{ marginTop: "10px" }}>{formatPrice(product.price)}</h2>

            {product.rating && (
              <p style={{ marginTop: "8px" }}>
                ⭐ {product.rating} {product.reviews ? `(${product.reviews} reviews)` : ""}
              </p>
            )}

            {product.color && (
              <p style={{ marginTop: "8px" }}>
                <strong>Color:</strong> {product.color}
              </p>
            )}

            <p style={{ marginTop: "8px", color: outOfStock ? "#d62828" : stock <= 5 ? "#b45309" : "#166534" }}>
              {outOfStock ? "Out of stock" : stock <= 5 ? `Only ${stock} left` : "In stock"}
            </p>

            <h3 style={{ marginTop: "24px" }}>Select Size</h3>
            <div style={{ display: "flex", gap: "10px", margin: "10px 0 20px", flexWrap: "wrap" }}>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={selectedSize === size ? "btn" : "btn btn-outline"}
                  style={{ minWidth: "48px" }}
                >
                  {size}
                </button>
              ))}
            </div>

            <h3>Quantity</h3>
            <div className="qty" style={{ margin: "10px 0 20px" }}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}>
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                disabled={quantity >= stock}
              >
                +
              </button>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button className="btn" onClick={handleAddToCart} disabled={outOfStock}>
                Add To Cart
              </button>
              <button className="btn btn-outline" onClick={handleBuyNow} disabled={outOfStock}>
                Buy Now
              </button>
              <button
                className="btn btn-outline"
                onClick={() => toggleWishlist(product.id)}
                style={{ color: wished ? "#e63946" : "#000" }}
              >
                {wished ? "♥ Wishlisted" : "♡ Wishlist"}
              </button>
            </div>

            {product.description && (
              <div style={{ marginTop: "40px" }}>
                <h3>Description</h3>
                <p style={{ marginTop: "8px", lineHeight: 1.6 }}>{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section style={{ marginTop: "60px" }}>
            <h2 style={{ marginBottom: "20px" }}>You May Also Like</h2>
            <div className="grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const { products, productsLoading } = useStore();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>{productsLoading ? "Loading product..." : "Product not found"}</h2>
          {!productsLoading && (
            <>
              <p>This product may have been removed.</p>
              <Link to="/products" className="btn">
                Back to Products
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category && p.category === product.category)
    .slice(0, 4);

  // key resets size/quantity when moving to another product
  return <ProductDetailView key={product.id} product={product} related={related} />;
};

export default ProductDetail;
