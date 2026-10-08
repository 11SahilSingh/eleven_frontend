import { Link } from "react-router-dom";

const YEAR = new Date().getFullYear();

const linkStyle = { color: "#ccc", textDecoration: "none", fontSize: "14px" };

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "30px 20px",
        textAlign: "center",
      }}
    >
      <h4 style={{ letterSpacing: "0.1em" }}>ELEVEN STORE</h4>
      <p style={{ marginTop: "6px", color: "#ccc" }}>Premium Fashion For Everyone</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          margin: "18px 0",
        }}
      >
        <Link to="/products" style={linkStyle}>Shop</Link>
        <Link to="/category" style={linkStyle}>Categories</Link>
        <Link to="/wishlist" style={linkStyle}>Wishlist</Link>
        <Link to="/orders" style={linkStyle}>My Orders</Link>
        <Link to="/userprofile" style={linkStyle}>My Account</Link>
      </div>

      <p style={{ fontSize: "13px", color: "#999" }}>© {YEAR} ELEVEN. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
