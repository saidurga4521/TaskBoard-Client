import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../pages/Navbar";
import { getAuthToken } from "../helpers/localstorage.js";

const ProtectedRoute = ({ children, isPublic = false }) => {
  const token = getAuthToken();
  console.log("the token", token);
  const location = useLocation();

  if (!token && !isPublic) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (token && isPublic) {
    return <Navigate to="/" replace />;
  }
  console.log("the protected route");
  return !isPublic ? (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  ) : (
    children
  );
};

export default ProtectedRoute;
