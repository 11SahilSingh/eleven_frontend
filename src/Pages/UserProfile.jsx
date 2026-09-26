
import React from "react";

function UserProfile() {
  const user = {
    name: "Sahil",
    email: "sahil@example.com",
    phone: "+91 9876543210",
    address: "Andhra Pradesh, India",
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
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            style={{
              borderRadius: "50%",
              marginBottom: "20px",
            }}
          />

          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        <hr />

        <div style={{ marginTop: "20px" }}>
          <h3>Personal Information</h3>

          <p>
            <strong>Phone:</strong> {user.phone}
          </p>

          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button>Edit Profile</button>

          <button>My Orders</button>

          <button>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

