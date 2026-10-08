import { useState } from "react";
import useStore from "../hooks/useStore";
import { formatDate, formatPrice, ORDER_STATUSES, PAYMENT_LABELS } from "../utils/format";

function ManageOrders() {
  const { orders, updateOrderStatus, notify } = useStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const term = search.trim().toLowerCase();
  const visible = orders.filter(
    (o) =>
      (!statusFilter || o.status === statusFilter) &&
      (!term ||
        o.id.toLowerCase().includes(term) ||
        o.customer.toLowerCase().includes(term) ||
        (o.email || "").toLowerCase().includes(term))
  );

  const handleStatus = (orderId, status) => {
    updateOrderStatus(orderId, status);
    notify(`Order ${orderId} marked as ${status}.`);
  };

  return (
    <div className="page">
      <div className="container">
        <h1 style={{ marginBottom: "20px" }}>Manage Orders</h1>

        <div className="toolbar-group" style={{ marginBottom: "20px" }}>
          <input
            className="form-input"
            type="search"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "320px", marginTop: 0 }}
          />
          <select
            className="form-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: "auto", marginTop: 0 }}
            aria-label="Filter by status"
          >
            <option value="">All Statuses</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {order.customer}
                    <div className="muted" style={{ fontSize: "13px" }}>{order.email}</div>
                  </td>
                  <td style={{ fontSize: "14px" }}>
                    {order.items.map((item) => (
                      <div key={item.key}>
                        {item.name} {item.size ? `(${item.size})` : ""} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>{formatPrice(order.total)}</td>
                  <td>{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{formatDate(order.date)}</td>
                  <td>
                    <select
                      className="form-input"
                      style={{ marginTop: 0, width: "auto" }}
                      value={order.status}
                      onChange={(e) => handleStatus(order.id, e.target.value)}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }} className="muted">
                    {orders.length === 0 ? "No orders have been placed yet." : "No orders match your filters."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
