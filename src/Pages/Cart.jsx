
import React, { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Black Oversized T-Shirt",
      price: 799,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Blue Denim Jacket",
      price: 1999,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Shopping Cart 🛒</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            border: "1px solid #ddd",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            width="120"
            height="120"
          />

          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button onClick={() => decreaseQty(item.id)}>-</button>

            <span style={{ margin: "0 15px" }}>
              {item.quantity}
            </span>

            <button onClick={() => increaseQty(item.id)}>+</button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <div
        style={{
          marginTop: "30px",
          textAlign: "right",
        }}
      >
        <h2>Total: ₹{totalAmount}</h2>

        <button
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "12px 25px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
