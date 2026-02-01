import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const getUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

const routePermissions = {
  "/home": ["student", "volunteer"],
  "/user-dashboard": ["student"],
  "/events": ["student", "volunteer"],
  "/organizer-dashboard": ["organizer"],
  "/admin-dashboard": ["admin"],
  "/volunteer-dashboard": ["volunteer"],
  "/edit-profile": ["student", "volunteer", "organizer"],
  "/admin-edit-user": ["admin"],
  "/event-detail": ["student", "volunteer", "organizer", "admin"],
};

const roleFallbacks = {
  admin: "/admin-dashboard",
  organizer: "/organizer-dashboard",
  volunteer: "/volunteer-dashboard",
  student: "/home",
};

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const token = localStorage.getItem("token");
  const allowedRoles = routePermissions[location.pathname];

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      alert("⚠️ You don't have permission to view this page.");
      navigate(roleFallbacks[user.role] || "/home");
    }
  }, [token, user, location.pathname, navigate]);

  if (!token || !user) return null;

  if (allowedRoles && !allowedRoles.includes(user.role)) return null;

  return children;
}

export default ProtectedRoute;
