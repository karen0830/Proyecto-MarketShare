import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./user/context/AuthContext";
import Loader from "./user/components/Loaders/Loader";

const ProtectedRouter = () => {
  const { loading, user, isAuthenticated } = useAuth();
  if (loading) return <Loader />;
  if (!loading && !isAuthenticated) return <Navigate to="/loginUser" />;

  return <Outlet />;
};

export default ProtectedRouter;
