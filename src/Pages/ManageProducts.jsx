
import React, { useState } from "react";

function ManageProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Black Oversized T-Shirt",
      price: 799,
      stock: 50,
      category: "T-Shirts",
    },
    {
      id: 2,
      name: "Blue Denim Jacket",
      price: 1999,
      stock: 20,
      category: "Jackets",
    },
  ]);

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Manage Products</h1>

      <input
        type="text"
        placeholder="Search Product..."
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>

              <td>
                <button>Edit</button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProducts;

