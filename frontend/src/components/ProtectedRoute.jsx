import { useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const role = user ? user.role : null;

    // If the user is not authenticated, route them back to login page
    if (!user && !role) {
        useEffect(() => {
            toast.dismiss()
            toast.error("Please login first before accessing this page.")
        }, [])
        return <Navigate to={'/login'} />;
    }

    // If the user's role is not allowed, route them back to home page
    if (!allowedRoles.includes(role)) {
        useEffect(() => {
            toast.dismiss()
            toast.error("You are unauthorized to enter this page.")
        }, [])
        return <Navigate to={'/home'} />;
    }

    return <Outlet />;
};
