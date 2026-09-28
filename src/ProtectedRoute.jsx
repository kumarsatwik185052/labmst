import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const payload = JSON.parse(
    atob(token.split(".")[1])
  );

  if (
    allowedRoles &&
    !allowedRoles.includes(payload.role)
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;