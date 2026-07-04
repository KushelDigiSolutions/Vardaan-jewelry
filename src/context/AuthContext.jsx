"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://vardaan-backend.vercel.app/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to fetch options
  const getHeaders = useCallback((customToken = null) => {
    const activeToken = customToken || token || localStorage.getItem("vardaan_token");
    return {
      "Content-Type": "application/json",
      ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
    };
  }, [token]);

  // Load User Addresses
  const loadAddresses = useCallback(async (customToken = null) => {
    try {
      const res = await fetch(`${API_URL}/auth/addresses`, {
        method: "GET",
        headers: getHeaders(customToken),
      });
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.data || data);
      }
    } catch (err) {
      console.error("Failed to load user addresses:", err);
    }
  }, [getHeaders]);

  // Fetch current user details with token
  const fetchProfile = useCallback(async (authToken) => {
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: getHeaders(authToken),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.data || data);
        setToken(authToken);
        localStorage.setItem("vardaan_token", authToken);
        await loadAddresses(authToken);
      } else {
        // Clear invalid session
        logout();
      }
    } catch (err) {
      console.error("Profile retrieval error:", err);
      logout();
    } finally {
      setAuthLoading(false);
    }
  }, [getHeaders, loadAddresses]);

  // Check login on startup
  useEffect(() => {
    const savedToken = localStorage.getItem("vardaan_token");
    if (savedToken) {
      fetchProfile(savedToken);
    } else {
      setAuthLoading(false);
    }
  }, [fetchProfile]);

  // Sign In with Email & Password
  const login = async (email, password) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.message || `Login failed with status ${res.status}`);
      }

      setUser(data?.data || data);
      const authToken = data?.data?.token || data?.token;
      setToken(authToken);
      localStorage.setItem("vardaan_token", authToken);
      await loadAddresses(authToken);
      return data?.data || data;
    } catch (err) {
      const message = err?.message || "Login failed. Please try again.";
      setError(message);
      throw new Error(message);
    }
  };

  // Sign Up / Register Account
  const register = async (userData) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create account");
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Request Mobile OTP login
  const loginMobile = async (mobile) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/login-mobile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send mobile OTP");
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Verify Mobile Login OTP
  const verifyMobileOtp = async (mobile, otp) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/verify-mobile-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid OTP code");
      }
      setUser(data.data || data);
      setToken(data.data?.token || data.token);
      localStorage.setItem("vardaan_token", data.data?.token || data.token);
      await loadAddresses(data.data?.token || data.token);
      return data.data || data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Verify Email OTP
  const verifyEmailOtp = async (otp) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to verify email");
      }
      // Refresh details
      if (token) fetchProfile(token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Log Out / Reset State
  const logout = () => {
    setUser(null);
    setToken(null);
    setAddresses([]);
    localStorage.removeItem("vardaan_token");
  };

  // Update Profile Name / Mobile
  const updateProfile = async (profileData) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      setUser(prev => prev ? { ...prev, ...(data.data || data) } : (data.data || data));
      return data.data || data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Change Account Password
  const changePassword = async (oldPassword, newPassword) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Upload Profile Avatar (Multer)
  const uploadAvatar = async (formData) => {
    setError(null);
    try {
      const activeToken = token || localStorage.getItem("vardaan_token");
      const res = await fetch(`${API_URL}/auth/avatar`, {
        method: "PUT",
        headers: {
          ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
        },
        body: formData, // Contains multipart form data
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to upload avatar");
      }
      setUser(prev => prev ? { ...prev, avatar: data.avatar } : prev);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Remove Avatar Image
  const removeAvatar = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/avatar`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to remove avatar");
      }
      setUser(prev => prev ? { ...prev, avatar: "" } : prev);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete User Account
  const deleteAccount = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/delete-account`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete account");
      }
      logout();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Address CRUD: Save Address
  const addAddress = async (addrData) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/addresses`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(addrData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to save address");
      }
      setAddresses(data.data || data);
      return data.data || data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Address CRUD: Edit Address
  const updateAddress = async (id, addrData) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/addresses/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(addrData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update address");
      }
      setAddresses(data.data || data);
      return data.data || data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Address CRUD: Remove Address
  const deleteAddress = async (id) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/addresses/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete address");
      }
      setAddresses(data.data || data);
      return data.data || data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Address CRUD: Flag Default Address
  const setDefaultAddress = async (id) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/addresses/${id}/default`, {
        method: "PUT",
        headers: getHeaders(),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to set default address");
      }
      setAddresses(data.data || data);
      return data.data || data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        addresses,
        authLoading,
        error,
        login,
        loginMobile,
        verifyMobileOtp,
        verifyEmailOtp,
        register,
        logout,
        updateProfile,
        changePassword,
        uploadAvatar,
        removeAvatar,
        deleteAccount,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        loadAddresses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
