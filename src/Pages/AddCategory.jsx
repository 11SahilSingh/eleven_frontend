
import React, { useState } from "react";

function AddCategory() {
  const [category, setCategory] = useState({
    categoryName: "",
    description: "",
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(category);

    // Call Spring Boot API
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h1>Add Category</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="categoryName"
            placeholder="Category Name"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
            }}
          />

          <textarea
            name="description"
            placeholder="Category Description"
            onChange={handleChange}
            rows="4"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
            }}
          />

          <input
            type="file"
            style={{
              marginTop: "15px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;

