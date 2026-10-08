import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";
import { formatPrice } from "../utils/format";

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useStore();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        background: "white",
        padding: "15px",
        marginBottom: "16px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        flexWrap: "wrap",
      }}
    >
      <Link to={`/product/${encodeURIComponent(item.productId)}`}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "110px", height: "130px", objectFit: "cover", borderRadius: "8px" }}
        />
      </Link>

      <div style={{ flex: 1, minWidth: "180px" }}>
        <h3 style={{ fontSize: "17px" }}>{item.name}</h3>
        {item.size && <p className="muted" style={{ marginTop: "4px" }}>Size: {item.size}</p>}
        <p style={{ margin: "6px 0 12px", fontWeight: 600 }}>{formatPrice(item.price)}</p>

        <div className="qty">
          <button
            onClick={() => updateCartQuantity(item.key, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => updateCartQuantity(item.key, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <p style={{ fontWeight: 700, marginBottom: "12px" }}>
          {formatPrice(item.price * item.quantity)}
        </p>
        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.key)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
