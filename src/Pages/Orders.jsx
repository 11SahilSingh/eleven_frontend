import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";
import { formatDate, formatPrice, PAYMENT_LABELS } from "../utils/format";

function Orders() {
  const { myOrders, updateOrderStatus } = useStore();

  const cancelOrder = (orderId) => {
    if (window.confirm("Cancel this order?")) updateOrderStatus(orderId, "Cancelled");
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: "900px" }}>
        <h1 className="page-title">My Orders</h1>

        {myOrders.length === 0 ? (
          <div className="empty-state">
            <h2>No orders yet</h2>
            <p>When you place an order, it will show up here.</p>
            <Link to="/products" className="btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          myOrders.map((order) => (
            <div key={order.id} className="panel" style={{ marginBottom: "20px", padding: "20px" }}>
              <div className="toolbar" style={{ marginBottom: "12px" }}>
                <div>
                  <h3>Order {order.id}</h3>
                  <p className="muted" style={{ fontSize: "14px" }}>
                    Placed on {formatDate(order.date)} ·{" "}
                    {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
                  </p>
                </div>
                <span className={`status status-${order.status}`}>{order.status}</span>
              </div>

              {order.items.map((item) => (
                <div
                  key={item.key}
                  style={{ display: "flex", gap: "16px", alignItems: "center", padding: "10px 0", borderTop: "1px solid #eee" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "70px", height: "84px", objectFit: "cover", borderRadius: "6px" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600 }}>{item.name}</p>
                    <p className="muted" style={{ fontSize: "14px" }}>
                      {item.size ? `Size ${item.size} · ` : ""}Qty {item.quantity}
                    </p>
                  </div>
                  <p>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}

              <div className="toolbar" style={{ borderTop: "1px solid #eee", paddingTop: "12px", marginBottom: 0 }}>
                <p className="muted" style={{ fontSize: "14px" }}>
                  Deliver to: {order.shipping?.fullName}, {order.shipping?.city} {order.shipping?.pincode}
                </p>
                <div className="toolbar-group">
                  <strong>Total: {formatPrice(order.total)}</strong>
                  {order.status === "Pending" && (
                    <button className="btn btn-outline btn-sm" onClick={() => cancelOrder(order.id)}>
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
