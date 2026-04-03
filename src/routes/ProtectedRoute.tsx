import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { authUserSelector, authLoadingSelector } from "../store/auth/slice/auth.slice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const user = useSelector(authUserSelector);
  const loading = useSelector(authLoadingSelector);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;