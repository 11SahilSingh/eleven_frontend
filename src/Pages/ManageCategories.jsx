
import React, { useState } from "react";

function ManageCategories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "T-Shirts",
      description: "Oversized and regular fit t-shirts",
    },
    {
      id: 2,
      name: "Jackets",
      description: "Denim and winter jackets",
    },
    {
      id: 3,
      name: "Hoodies",
      description: "Premium cotton hoodies",
    },
  ]);

  const deleteCategory = (id) => {
    setCategories(
      categories.filter((category) => category.id !== id)
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Manage Categories</h1>

      <input
        type="text"
        placeholder="Search Category..."
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
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>

              <td>
                <button>Edit</button>

                <button
                  onClick={() => deleteCategory(category.id)}
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

export default ManageCategories;

