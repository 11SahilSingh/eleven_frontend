import React from 'react'
import { Link } from 'react-router-dom'

import elevenlogo from "../assets/elevenlogo.jpeg";
import wishlistlogo from "../assets/wishlistlogo.jpeg";
import cartlogo from "../assets/cartlogo.jpeg";
import menu from "../assets/menu.jpeg";
import userlogo from "../assets/userlogo.jpeg";

const Navbar = () => {
  return (
    <nav
  style={{
    backgroundColor: "black",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: "1000"
  }}
>

      {/* Left Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link to="/">
          <img
            src={elevenlogo}
            alt="Logo"
            style={{ height: "40px" }}
          />
        </Link>

        <Link to="/category">
          <img
            src={menu}
            alt="Menu"
            style={{ height: "31px" }}
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          margin: "0 40px",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          style={{
            width: "60%",
            padding: "10px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
          }}
        />
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <Link to="/wishlist">
          <img
            src={wishlistlogo}
            alt="Wishlist"
            style={{ height: "31px" }}
          />
        </Link>

        <Link to="/cart">
          <img
            src={cartlogo}
            alt="Cart"
            style={{ height: "40px" }}
          />
        </Link>

        <Link to="/userprofile">
          <img
            src={userlogo}
            alt="Profile"
            style={{ height: "25px" }}
          />
        </Link>
      </div>

    </nav>
  )
}

export default Navbar