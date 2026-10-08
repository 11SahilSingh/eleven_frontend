import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";
import "../css/Navbar.css";

import elevenlogo from "../assets/elevenlogo.jpeg";
import wishlistlogo from "../assets/wishlistlogo.jpeg";
import cartlogo from "../assets/cartlogo.jpeg";
import menu from "../assets/menu.jpeg";
import userlogo from "../assets/userlogo.jpeg";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount, wishlist, currentUser, isAdmin } = useStore();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <Link to="/" aria-label="ELEVEN home">
          <img src={elevenlogo} alt="ELEVEN" style={{ height: "40px" }} />
        </Link>

        <Link to="/category" aria-label="Categories">
          <img src={menu} alt="Categories" style={{ height: "31px" }} />
        </Link>
      </div>

      {/* Search Bar */}
      <form className="navbar-search" onSubmit={handleSearch} role="search">
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
      </form>

      {/* Right Section */}
      <div className="navbar-right">
        {isAdmin && (
          <Link to="/adminDashboard" className="navbar-link">
            Admin
          </Link>
        )}

        {!currentUser && (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        )}

        <Link to="/wishlist" className="navbar-icon" aria-label="Wishlist">
          <img src={wishlistlogo} alt="Wishlist" style={{ height: "31px" }} />
          {wishlist.length > 0 && <span className="navbar-badge">{wishlist.length}</span>}
        </Link>

        <Link to="/cart" className="navbar-icon" aria-label="Cart">
          <img src={cartlogo} alt="Cart" style={{ height: "40px" }} />
          {cartCount > 0 && <span className="navbar-badge">{cartCount}</span>}
        </Link>

        <Link to="/userprofile" className="navbar-icon" aria-label="Profile">
          <img src={userlogo} alt="Profile" style={{ height: "25px" }} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
