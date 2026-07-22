import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for an active user session on app load
    const savedUser = localStorage.getItem("current_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user from localStorage", e);
        localStorage.removeItem("current_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Retrieve users list
    const users = JSON.parse(localStorage.getItem("app_users") || "[]");
    
    // Find matching credentials
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const sessionUser = { name: foundUser.name, email: foundUser.email };
      setUser(sessionUser);
      localStorage.setItem("current_user", JSON.stringify(sessionUser));
      return { success: true };
    } else {
      return { success: false, message: "Invalid email address or password." };
    }
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("app_users") || "[]");

    // Check if email already exists
    const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return { success: false, message: "This email address is already registered." };
    }

    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("app_users", JSON.stringify(users));

    // Log the user in automatically after signup
    const sessionUser = { name, email };
    setUser(sessionUser);
    localStorage.setItem("current_user", JSON.stringify(sessionUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("current_user");
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
