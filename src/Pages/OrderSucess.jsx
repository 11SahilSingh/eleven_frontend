import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  const orderId = "ORD123456";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          textAlign: "center",
          width: "500px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1>🎉 Order Placed Successfully!</h1>

        <p style={{ marginTop: "20px" }}>
          Thank you for shopping with Eleven.
        </p>

        <h3>Order ID: {orderId}</h3>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <Link to="/">
            <button>Continue Shopping</button>
          </Link>

          <Link to="/orders">
            <button>My Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
