import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";
import { formatPrice, PAYMENT_LABELS } from "../utils/format";

function Checkout() {
  const navigate = useNavigate();
  const { cart, cartCount, cartSubtotal, shippingFee, cartTotal, currentUser, placeOrder } =
    useStore();

  const [shipping, setShipping] = useState({
    fullName: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    city: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add some products before checking out.</p>
          <Link to="/products" className="btn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(shipping.phone.replace(/\D/g, "").slice(-10))) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!/^\d{6}$/.test(shipping.pincode.trim())) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    if (paymentMethod === "UPI" && !/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
      setError("Please enter a valid UPI ID (for example name@upi).");
      return;
    }

    const order = placeOrder({
      shipping: { ...shipping, upiId: paymentMethod === "UPI" ? upiId.trim() : undefined },
      paymentMethod,
    });

    if (order) navigate(`/order-success?id=${order.id}`, { replace: true });
  };

  return (
    <div className="page">
      <form
        onSubmit={handlePlaceOrder}
        className="two-col container"
        style={{
          maxWidth: "960px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          alignItems: "start",
        }}
      >
        <div className="panel">
          <h2>Delivery Address</h2>

          <div className="form-row">
            <label className="form-label">
              Full Name
              <input className="form-input" name="fullName" value={shipping.fullName} onChange={handleChange} required />
            </label>
            <label className="form-label">
              Mobile Number
              <input className="form-input" name="phone" type="tel" value={shipping.phone} onChange={handleChange} required />
            </label>
          </div>

          <label className="form-label">
            Address
            <textarea
              className="form-input"
              name="address"
              rows="3"
              placeholder="House no, street, area"
              value={shipping.address}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-row">
            <label className="form-label">
              City
              <input className="form-input" name="city" value={shipping.city} onChange={handleChange} required />
            </label>
            <label className="form-label">
              Pincode
              <input
                className="form-input"
                name="pincode"
                inputMode="numeric"
                maxLength="6"
                value={shipping.pincode}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <h2 style={{ marginTop: "30px" }}>Payment Method</h2>

          <div style={{ marginTop: "15px", display: "grid", gap: "12px" }}>
            {Object.entries(PAYMENT_LABELS).map(([value, label]) => (
              <label key={value} style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="payment"
                  value={value}
                  checked={paymentMethod === value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {label}
              </label>
            ))}
          </div>

          {paymentMethod === "UPI" && (
            <label className="form-label">
              UPI ID
              <input
                className="form-input"
                placeholder="name@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </label>
          )}

          {paymentMethod === "CARD" && (
            <p className="notice" style={{ marginTop: "16px", marginBottom: 0 }}>
              Card payments will be collected securely by the payment gateway once it is connected.
            </p>
          )}
        </div>

        <div className="panel">
          <h2>Order Summary</h2>

          <div style={{ marginTop: "14px", display: "grid", gap: "8px" }}>
            {cart.map((item) => (
              <div key={item.key} className="summary-row" style={{ marginTop: 0, fontSize: "14px", gap: "10px" }}>
                <span>
                  {item.name} {item.size ? `(${item.size})` : ""} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="summary-row" style={{ borderTop: "1px solid #eee", paddingTop: "10px" }}>
            <span>Items ({cartCount})</span>
            <span>{formatPrice(cartSubtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-block" style={{ marginTop: "20px" }}>
            Place Order
          </button>
          <Link to="/cart" className="btn btn-outline btn-block" style={{ marginTop: "10px" }}>
            Back to Cart
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
