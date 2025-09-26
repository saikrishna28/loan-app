import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return !isAuthenticated ? <>{children}</> : <Navigate to="/home" />;
};

export default PublicRoute;
