
import React, { useState } from "react";

function ManageOrders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD1001",
      customer: "Sahil",
      product: "Black Oversized T-Shirt",
      amount: 799,
      status: "Pending",
      date: "20 Sep 2026",
    },
    {
      id: "ORD1002",
      customer: "Rahul",
      product: "Blue Denim Jacket",
      amount: 1999,
      status: "Shipped",
      date: "19 Sep 2026",
    },
  ]);

  const updateStatus = (orderId, status) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Manage Orders</h1>

      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>₹{order.amount}</td>
              <td>{order.date}</td>

              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageOrders;

