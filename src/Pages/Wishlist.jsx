import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";
import { formatPrice } from "../utils/format";

function Wishlist() {
  const { wishlistProducts, removeFromWishlist, addToCart } = useStore();

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">My Wishlist ❤️</h1>

        {wishlistProducts.length === 0 ? (
          <div className="empty-state">
            <h2>Your wishlist is empty</h2>
            <p>Tap the ♡ on any product to save it here.</p>
            <Link to="/products" className="btn">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid">
            {wishlistProducts.map((item) => (
              <div key={item.id} className="product-card" style={{ textAlign: "center" }}>
                <Link to={`/product/${encodeURIComponent(item.id)}`} className="product-card-image">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="product-card-body">
                  <h3 className="product-card-name">{item.name}</h3>
                  <p className="product-card-price">{formatPrice(item.price)}</p>
                  <div className="product-card-actions">
                    <button className="btn btn-sm" style={{ flex: 1 }} onClick={() => moveToCart(item)}>
                      Move To Cart
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromWishlist(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
