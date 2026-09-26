import React from "react";

const Home = () => {
  const categories = [
    "Men",
    "Women",
    "Kids",
    "Sports",
    "Jeans",
    "Shirt",
    "Pant",
    "Cargo"
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Black Hoodie",
      price: "₹999"
    },
    {
      id: 2,
      name: "Blue Jeans",
      price: "₹1499"
    },
    {
      id: 3,
      name: "White T-Shirt",
      price: "₹599"
    },
    {
      id: 4,
      name: "Sneakers",
      price: "₹2499"
    }
  ];

  return (
    <div>

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#f5f5f5",
          padding: "100px 20px",
          textAlign: "center"
        }}
      >
        <h1>NEW COLLECTION 2026</h1>
        <h3>Premium Fashion Store</h3>

        <button
          style={{
            padding: "12px 25px",
            marginTop: "20px",
            border: "none",
            backgroundColor: "black",
            color: "white",
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          Shop Now
        </button>
      </section>

      {/* Categories */}
      <section
        style={{
          padding: "40px"
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Shop By Category
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap"
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              style={{
                width: "200px",
                height: "120px",
                backgroundColor: "#eeeeee",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section
        style={{
          padding: "40px"
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Featured Products
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px"
          }}
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                width: "220px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center"
              }}
            >
              <div
                style={{
                  height: "180px",
                  backgroundColor: "#f0f0f0",
                  marginBottom: "15px"
                }}
              />

              <h5>{product.name}</h5>

              <p>{product.price}</p>

              <button
                style={{
                  padding: "8px 15px",
                  border: "none",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: "20px",
          marginTop: "50px"
        }}
      >
        <h4>ELEVEN STORE</h4>

        <p>Premium Fashion For Everyone</p>

        <p>© 2026 All Rights Reserved</p>
      </footer>

    </div>
  );
};

export default Home;