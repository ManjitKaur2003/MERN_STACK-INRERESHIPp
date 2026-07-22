import React from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

const AuthLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  // If user is already authenticated, redirect to products dashboard
  if (user) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="auth-wrapper">
      <div className="container">
        {/* Glowing Brand Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1>{isLogin ? "Welcome Back" : "Get Started"}</h1>
          <p className="subtitle">
            {isLogin
              ? "Access your local product dashboard"
              : "Register your local account to begin"}
          </p>
        </div>

        {/* Tab Selector Links */}
        <div className="buttons">
          <Link
            to="/login"
            style={{ flex: 1, textDecoration: "none", display: "flex" }}
          >
            <button className={isLogin ? "active" : ""} style={{ width: "100%" }}>
              Sign In
            </button>
          </Link>
          <Link
            to="/signup"
            style={{ flex: 1, textDecoration: "none", display: "flex" }}
          >
            <button className={!isLogin ? "active" : ""} style={{ width: "100%" }}>
              Sign Up
            </button>
          </Link>
        </div>

        {/* The Login or Signup form */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
