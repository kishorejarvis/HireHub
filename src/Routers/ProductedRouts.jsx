import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
