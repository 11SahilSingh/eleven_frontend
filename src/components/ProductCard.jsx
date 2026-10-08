import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";
import { formatPrice } from "../utils/format";
import { placeholderImage } from "../utils/placeholder";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wished = isInWishlist(product.id);
  const outOfStock =
    product.stock !== undefined && product.stock !== null && Number(product.stock) <= 0;
  const detailUrl = `/product/${encodeURIComponent(product.id)}`;

  return (
    <div className="product-card">
      <Link to={detailUrl} className="product-card-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholderImage(product.name);
          }}
        />
      </Link>

      <div className="product-card-body">
        {product.brand && <p className="product-card-brand">{product.brand}</p>}
        <h3 className="product-card-name">
          <Link to={detailUrl}>{product.name}</Link>
        </h3>
        <p className="product-card-price">{formatPrice(product.price)}</p>

        <div className="product-card-actions">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            title={wished ? "Remove from wishlist" : "Add to wishlist"}
            style={{ color: wished ? "#e63946" : "#000", fontSize: "18px" }}
          >
            {wished ? "♥" : "♡"}
          </button>

          <button
            className="btn btn-sm"
            style={{ flex: 1 }}
            disabled={outOfStock}
            onClick={() => addToCart(product)}
          >
            {outOfStock ? "Out of Stock" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
