import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // ✅ login नंतर परत याच route वर यायला state पाठवतो
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}