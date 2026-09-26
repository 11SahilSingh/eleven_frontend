
import React, { useState } from "react";

function Checkout() {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalAmount = 2798;

  const handlePlaceOrder = () => {
    alert("Order Placed Successfully!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Delivery Address</h2>

          <textarea
            rows="6"
            placeholder="Enter your address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "10px",
            }}
          />

          <h2 style={{ marginTop: "30px" }}>Payment Method</h2>

          <div style={{ marginTop: "15px" }}>
            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              Cash On Delivery
            </label>

            <br />
            <br />

            <label>
              <input
                type="radio"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              UPI
            </label>

            <br />
            <br />

            <label>
              <input
                type="radio"
                value="CARD"
                checked={paymentMethod === "CARD"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              Debit/Credit Card
            </label>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            height: "fit-content",
          }}
        >
          <h2>Order Summary</h2>

          <p>Total Items: 2</p>

          <h3>Total Amount: ₹{totalAmount}</h3>

          <button
            onClick={handlePlaceOrder}
            style={{
              width: "100%",
              padding: "12px",
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

