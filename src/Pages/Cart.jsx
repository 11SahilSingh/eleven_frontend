import { Link, useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";
import CartItem from "../components/CartItem";
import { formatPrice } from "../utils/format";

function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    cartTotal,
    freeShippingThreshold,
    clearCart,
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <h1>Your cart is empty 🛒</h1>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Shopping Cart 🛒</h1>

        <div
          className="two-col"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}
        >
          <div>
            {cart.map((item) => (
              <CartItem key={item.key} item={item} />
            ))}
            <button className="btn btn-outline btn-sm" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="panel" style={{ padding: "24px" }}>
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items ({cartCount})</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</span>
            </div>
            {shippingFee > 0 && (
              <p className="muted" style={{ fontSize: "13px", marginTop: "8px" }}>
                Add {formatPrice(freeShippingThreshold - cartSubtotal)} more for free shipping.
              </p>
            )}
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <button className="btn btn-block" style={{ marginTop: "20px" }} onClick={() => navigate("/checkout")}>
              Proceed To Checkout
            </button>
            <Link to="/products" className="btn btn-outline btn-block" style={{ marginTop: "10px" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
