import React from "react";

function Orders() {
  const orders = [
    {
      id: "ORD123456",
      productName: "Black Oversized T-Shirt",
      image: "https://via.placeholder.com/150",
      quantity: 2,
      price: 1598,
      status: "Delivered",
      date: "20 Sep 2026",
    },
    {
      id: "ORD123457",
      productName: "Blue Denim Jacket",
      image: "https://via.placeholder.com/150",
      quantity: 1,
      price: 1999,
      status: "Shipped",
      date: "18 Sep 2026",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            background: "white",
            marginBottom: "20px",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <img
            src={order.image}
            alt={order.productName}
            width="120"
            height="120"
          />

          <div>
            <h3>{order.productName}</h3>
            <p>Order ID: {order.id}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ₹{order.price}</p>
            <p>Date: {order.date}</p>
            <p>Status: {order.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;

