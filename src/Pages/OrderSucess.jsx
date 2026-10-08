import { Link, useSearchParams } from "react-router-dom";
import useStore from "../hooks/useStore";
import { formatPrice, PAYMENT_LABELS } from "../utils/format";

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const { myOrders } = useStore();
  const orderId = searchParams.get("id");
  const order = myOrders.find((o) => o.id === orderId);

  return (
    <div
      className="page"
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="panel" style={{ textAlign: "center", width: "100%", maxWidth: "500px", padding: "40px" }}>
        {order ? (
          <>
            <h1>🎉 Order Placed Successfully!</h1>
            <p style={{ marginTop: "20px" }}>Thank you for shopping with Eleven.</p>
            <h3 style={{ marginTop: "16px" }}>Order ID: {order.id}</h3>
            <p className="muted" style={{ marginTop: "8px" }}>
              Total {formatPrice(order.total)} · {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
            </p>
          </>
        ) : (
          <>
            <h1>Order not found</h1>
            <p style={{ marginTop: "20px" }}>You can find all your orders on the My Orders page.</p>
          </>
        )}

        <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
          <Link to="/products" className="btn">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn btn-outline">
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
