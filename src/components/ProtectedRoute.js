import React from "react";
import { useAuth } from "../AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user?.token) {
        console.log("🚨 No auth token found, redirecting to login...");
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
