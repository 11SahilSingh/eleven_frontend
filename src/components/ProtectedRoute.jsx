import { Navigate, useLocation } from "react-router-dom";
import useStore from "../hooks/useStore";

// Sends guests to the login page, and non-admins away from admin pages.
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAdmin } = useStore();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
