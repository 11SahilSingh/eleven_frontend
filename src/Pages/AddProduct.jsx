import React, { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    size: "",
    color: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(product);

    // Call Spring Boot API here
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
            rows="4"
            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          />

          <select
            name="size"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          >
            <option value="">Select Size</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>

          <input
            type="text"
            name="color"
            placeholder="Color"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          />

          <input
            type="file"
            style={{ marginTop: "15px" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "12px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

