// src/routes/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader } from "lucide-react"; // Or your own spinner

const AdminRoute = () => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  // Check if user is logged in AND has the role of "admin"
  if (isLoggedIn && user?.role === "admin") {
    return <Outlet />; // Render the child component (Admin.jsx)
  }

  // If logged in but not admin, or not logged in, redirect
  return <Navigate to="/login" replace />;
};

export default AdminRoute;