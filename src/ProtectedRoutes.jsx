import React from "react";
import { getAccessToken } from "./common/session/cookies";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = getAccessToken();
  const location = useLocation();
  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ path: location.pathname }} replace />
      )}
    </>
  );
};

export default ProtectedRoutes;
