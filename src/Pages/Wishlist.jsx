
import React, { useState } from "react";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Black Oversized T-Shirt",
      price: 799,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Blue Denim Jacket",
      price: 1999,
      image: "https://via.placeholder.com/200",
    },
  ]);

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        My Wishlist ❤️
      </h1>

      {wishlistItems.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>Your wishlist is empty</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3>{item.name}</h3>
              <h4>₹{item.price}</h4>

              <button
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  border: "none",
                  backgroundColor: "black",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Add To Cart
              </button>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  backgroundColor: "red",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
