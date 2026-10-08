import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page">
      <div className="empty-state">
        <h1 style={{ fontSize: "64px" }}>404</h1>
        <h2>Page not found</h2>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
