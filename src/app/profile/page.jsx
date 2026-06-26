"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiUser, FiMapPin, FiPackage, FiRefreshCw, FiTrash2, FiCamera, FiEdit3, FiLogOut, FiPlus, FiStar, FiX, FiLock, FiEdit2, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { useToast } from "@/context/ToastContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781525765/Rectangle_23_10_roxkwo.png";
  if (imagePath.startsWith("http")) return imagePath;
  return `http://localhost:5000${imagePath}`;
};

export default function ProfilePage() {
  const router = useRouter();
  const { 
    user, 
    token, 
    addresses, 
    authLoading, 
    updateProfile, 
    changePassword, 
    uploadAvatar, 
    removeAvatar, 
    deleteAccount,
    addAddress, 
    updateAddress, 
    deleteAddress, 
    setDefaultAddress,
    logout 
  } = useAuth();
  const toast = useToast();

  // Active Tab: 'info' | 'addresses' | 'orders' | 'returns' | 'password'
  const [activeTab, setActiveTab] = useState("info");

  // Profile forms states
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  
  // Profile edit toggle
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Change Password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email verification OTP state
  const [emailOtp, setEmailOtp] = useState("");
  
  // Address CRUD inline form states
  const [isEditingAddress, setIsEditingAddress] = useState(null); // address object being edited
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addrForm, setAddrForm] = useState({ title: "Home", street: "", city: "", state: "", zipCode: "", country: "India", mobile: "" });

  // Orders and Returns tracking logs
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [returnsLoading, setReturnsLoading] = useState(false);

  // Detailed view & Review states
  const [selectedDetailedOrder, setSelectedDetailedOrder] = useState(null);
  const [reviewingProduct, setReviewingProduct] = useState(null); // { id, name }
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // Return Request Form state
  const [activeReturnOrder, setActiveReturnOrder] = useState(null); // Order object being returned
  const [editingReturn, setEditingReturn] = useState(null); // Return request object being edited
  const [returnItems, setReturnItems] = useState({}); // { [productId]: { selected: bool, quantity: num, reason: str } }
  const [refundMethod, setRefundMethod] = useState("upi");
  const [refundDetails, setRefundDetails] = useState({ upiId: "", accountNo: "", ifsc: "", bankName: "", holderName: "" });

  // Status alerts
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Cancellation and Review Handlers
  const handleCancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Failed to cancel order");
      }
      setMsg({ type: "success", text: "Order cancelled successfully!" });
      toast.success("Order cancelled successfully!");
      setSelectedDetailedOrder(null);
      fetchOrders();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
      toast.error(err.message || "Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewingProduct) return;
    setSubmittingReview(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch(`${API_URL}/products/${reviewingProduct.id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: reviewRating,
          comment: reviewComment
        })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Failed to submit review");
      }
      setMsg({ type: "success", text: `Review submitted for "${reviewingProduct.name}" successfully!` });
      setReviewingProduct(null);
      setReviewComment("");
      setReviewRating(5);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setSubmittingReview(false);
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [authLoading, token, router]);

  // Load User Details
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setMobile(user.mobile || "");
    }
  }, [user]);

  // Fetch Order history
  const fetchOrders = async () => {
    if (!token) return;
    setOrdersLoading(true);
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok) {
        setOrders(json.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch Return requests
  const fetchReturns = async () => {
    if (!token) return;
    setReturnsLoading(true);
    try {
      const res = await fetch(`${API_URL}/returns`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok) {
        setReturns(json.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReturnsLoading(false);
    }
  };

  // Trigger loads when tabs switch
  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
      fetchReturns();
    } else if (activeTab === "returns") {
      fetchReturns();
    }
  }, [activeTab]);

  // Update Name / Mobile Info
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      await updateProfile({ name, mobile });
      toast.success("Profile details updated successfully!");
      setIsEditingProfile(false);
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Update Account Password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Password Complexity Validation
    const pwd = newPassword;
    const minLength = 8;
    const hasCapital = /[A-Z]/.test(pwd);
    const hasSmall = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

    if (pwd.length < minLength) {
      toast.error("New password must be at least 8 characters long!");
      return;
    }
    if (!hasCapital) {
      toast.error("New password must contain at least one uppercase letter (capital letter)!");
      return;
    }
    if (!hasSmall) {
      toast.error("New password must contain at least one lowercase letter (small letter)!");
      return;
    }
    if (!hasNumber) {
      toast.error("New password must contain at least one number!");
      return;
    }
    if (!hasSpecial) {
      toast.error("New password must contain at least one special character!");
      return;
    }
    if (pwd !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    setLoading(true);
    try {
      await changePassword(oldPassword, newPassword);
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  // Account Email Verification OTP
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: user.email, otp: emailOtp })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Verification code is invalid");
      }
      setMsg({ type: "success", text: "Email verified successfully! Profile status updated." });
      setEmailOtp("");
      window.location.reload();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmailOtp = async () => {
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch(`${API_URL}/auth/resend-verification-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to resend verification OTP");
      }
      toast.success("Verification OTP code resent to your email!");
    } catch (err) {
      toast.error(err.message || "Failed to resend verification OTP");
    } finally {
      setLoading(false);
    }
  };

  // Upload Avatar File
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      await uploadAvatar(formData);
      setMsg({ type: "success", text: "Avatar image uploaded successfully!" });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Failed to upload avatar" });
    } finally {
      setLoading(false);
    }
  };

  // Remove Avatar Profile Image
  const handleRemoveAvatar = async () => {
    if (!confirm("Are you sure you want to remove your profile photo?")) return;
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      await removeAvatar();
      setMsg({ type: "success", text: "Avatar photo removed successfully!" });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Failed to remove avatar" });
    } finally {
      setLoading(false);
    }
  };

  // Delete User Account
  const handleDeleteAccount = async () => {
    const doubleCheck = confirm("WARNING: This will permanently delete your account, addresses, and shopping cart. This cannot be undone. Do you wish to proceed?");
    if (!doubleCheck) return;
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      await deleteAccount();
      router.push("/");
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Failed to delete account" });
      setLoading(false);
    }
  };

  // Addresses CRUD Methods
  const handleAddrFormChange = (e) => {
    setAddrForm({ ...addrForm, [e.target.name]: e.target.value });
  };

  const handleSaveNewAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      await addAddress(addrForm);
      setIsAddingAddress(false);
      setAddrForm({ title: "Home", street: "", city: "", state: "", zipCode: "", country: "India" });
      setMsg({ type: "success", text: "New address saved!" });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Failed to save address" });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEditAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      await updateAddress(isEditingAddress._id, isEditingAddress);
      setIsEditingAddress(null);
      setMsg({ type: "success", text: "Address modified successfully!" });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Failed to update address" });
    } finally {
      setLoading(false);
    }
  };

  // Return Request Actions
  const handleOpenReturnForm = (order, existingReturn = null) => {
    setActiveReturnOrder(order);
    setEditingReturn(existingReturn);
    
    const initialItemsState = {};
    order.items.forEach(item => {
      const prodId = item.product?._id || item.product;
      const existingItem = existingReturn?.items?.find(
        i => (i.productId?._id || i.productId || i.product?._id || i.product) === prodId
      );

      initialItemsState[prodId] = {
        productId: prodId,
        name: item.name,
        selected: !!existingItem,
        quantity: existingItem ? existingItem.quantity : 1,
        maxQty: item.quantity,
        reason: existingItem ? existingItem.reason : "Wrong size ordered"
      };
    });
    setReturnItems(initialItemsState);

    if (existingReturn) {
      setRefundMethod(existingReturn.refundMethod || "upi");
      setRefundDetails({
        upiId: existingReturn.refundDetails?.upiId || "",
        accountNo: existingReturn.refundDetails?.accountNo || "",
        ifsc: existingReturn.refundDetails?.ifsc || "",
        bankName: existingReturn.refundDetails?.bankName || "",
        holderName: existingReturn.refundDetails?.holderName || ""
      });
    } else {
      setRefundMethod("upi");
      setRefundDetails({ upiId: "", accountNo: "", ifsc: "", bankName: "", holderName: "" });
    }
  };

  const handleReturnItemChange = (prodId, field, val) => {
    setReturnItems(prev => ({
      ...prev,
      [prodId]: {
        ...prev[prodId],
        [field]: val
      }
    }));
  };

  const handleRefundDetailsChange = (e) => {
    setRefundDetails({ ...refundDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitReturnRequest = async (e) => {
    e.preventDefault();
    const itemsToSubmit = Object.values(returnItems).filter(i => i.selected).map(i => ({
      productId: i.productId,
      name: i.name,
      quantity: i.quantity,
      reason: i.reason
    }));

    if (itemsToSubmit.length === 0) {
      alert("Please select at least one item to return.");
      return;
    }

    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      let res;
      let json;
      const requestBody = {
        orderId: activeReturnOrder._id,
        items: itemsToSubmit,
        refundMethod,
        refundDetails: refundMethod === "upi" 
          ? { upiId: refundDetails.upiId }
          : {
              accountNo: refundDetails.accountNo,
              ifsc: refundDetails.ifsc,
              bankName: refundDetails.bankName,
              holderName: refundDetails.holderName
            }
      };

      if (editingReturn) {
        // Try Option A: PUT /returns/:id
        res = await fetch(`${API_URL}/returns/${editingReturn._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        });
        json = await res.json();

        // If A failed (e.g. 404/405), try Option B: PUT /returns/request/:id
        if (!res.ok && (res.status === 404 || res.status === 405)) {
          res = await fetch(`${API_URL}/returns/request/${editingReturn._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
          });
          json = await res.json();
        }

        // If B failed too, try Option C: PUT /returns/request with returnId in body
        if (!res.ok && (res.status === 404 || res.status === 405)) {
          res = await fetch(`${API_URL}/returns/request`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              returnId: editingReturn._id,
              ...requestBody
            })
          });
          json = await res.json();
        }
      } else {
        // Normal POST /returns/request
        res = await fetch(`${API_URL}/returns/request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        });
        json = await res.json();
      }

      if (!res.ok) {
        throw new Error(json.message || `Failed to ${editingReturn ? "update" : "submit"} return request`);
      }

      const successMsg = editingReturn 
        ? "Return request updated successfully!"
        : "Return request submitted successfully! An administrator will review your ticket.";

      setMsg({ type: "success", text: successMsg });
      toast.success(successMsg);
      setActiveReturnOrder(null);
      setEditingReturn(null);
      fetchOrders();
      fetchReturns();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
      toast.error(err.message || "Failed to submit return request");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="w-full text-center py-20 bg-[#FCFCF9] font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07512E] mx-auto mb-4"></div>
        <p className="text-gray-500">Loading profile data...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFCF9]">
      <Navbar />

      <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-10 lg:py-16 text-left">
        <div className="flex sm: flex-wrap  sm: gap-4 items-center justify-between mb-8 border-b border-[#F0ECE3] pb-6">
          <h1 className="text-[32px] md:text-[40px]  text-[#07512E]">My Account Dashboard</h1>
          <button
            onClick={() => { logout(); router.push("/login"); }}
            className="flex items-center text-nowrap  gap-1.5 border border-red-200 text-red-600 px-4 py-2 hover:bg-red-50 text-sm font-sans font-semibold cursor-pointer rounded"
          >
            <FiLogOut /> Sign Out
          </button>
        </div>

        {/* Global status alerts */}
        {msg.text && (
          <div className={`mb-6 p-4 rounded text-sm font-medium ${
            msg.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {msg.text}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Tab Navigation Menu (Left Sidebar) */}
          <div className="w-full lg:w-70 bg-white border border-[#F0ECE3] rounded-lg p-4 flex flex-col gap-1 shrink-0  shadow-sm">
            <button
              onClick={() => { setActiveTab("info"); setMsg({ type: "", text: "" }); }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded text-left text-[18px] font-semibold transition-colors cursor-pointer ${
                activeTab === "info" ? "bg-[#07512E] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiUser /> Profile Settings
            </button>
            <button
              onClick={() => { setActiveTab("addresses"); setMsg({ type: "", text: "" }); }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded text-left text-[18px] font-semibold transition-colors cursor-pointer ${
                activeTab === "addresses" ? "bg-[#07512E] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiMapPin /> Addresses Book
            </button>
            <button
              onClick={() => { setActiveTab("orders"); setMsg({ type: "", text: "" }); }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded text-left text-[18px] font-semibold transition-colors cursor-pointer ${
                activeTab === "orders" ? "bg-[#07512E] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiPackage /> My Order History
            </button>
            <button
              onClick={() => { setActiveTab("returns"); setMsg({ type: "", text: "" }); }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded text-left text-[18px] font-semibold transition-colors cursor-pointer ${
                activeTab === "returns" ? "bg-[#07512E] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiRefreshCw /> Track Returns
            </button>
            <button
              onClick={() => { setActiveTab("password"); setMsg({ type: "", text: "" }); }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded text-left text-[18px] font-semibold transition-colors cursor-pointer ${
                activeTab === "password" ? "bg-[#07512E] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiLock /> Change Password
            </button>
          </div>

          {/* Tab Content Panel (Right Column) */}
          <div className="flex-grow w-full min-h-68  bg-white border border-[#F0ECE3] rounded-lg p-6 sm:p-8 shadow-sm">
            
            {/* TAB 1: Profile Info & Security */}
            {activeTab === "info" && (
              <div className="animate-fade-in space-y-8">
                
                {/* Profile Header (Avatar Upload) */}
                <div className="flex flex-col sm:flex-row gap-6 items-center border-b border-gray-100 pb-6 font-sans">
                  <div className="relative w-20 h-20 rounded-full bg-[#07512E]/10 overflow-hidden border border-[#07512E]/20 flex items-center justify-center text-2xl font-bold text-[#07512E]">
                    {user.avatar ? (
                      <img 
                        src={user.avatar.startsWith("http") ? user.avatar : `http://localhost:5000${user.avatar}`} 
                        alt="Profile Photo" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name ? user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "U"
                    )}
                    
                    {/* Upload Overlay */}
                    <label className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity">
                      <FiCamera className="w-5 h-5" />
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarFileChange} disabled={loading} />
                    </label>
                  </div>

                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                    <p className="text-[18px] text-gray-500 mb-2">{user.email}</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      {user.avatar && (
                        <button 
                          onClick={handleRemoveAvatar} 
                          disabled={loading}
                          className="bg-transparent border-none text-red-500 hover:underline text-xs font-semibold cursor-pointer"
                        >
                          Remove photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personal Info Display Toggles */}
                {!isEditingProfile ? (
                  <div className="bg-[#FAF9F6] border border-[#F0ECE3] rounded-lg p-6 font-sans text-sm space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <h4 className="text-[26px] font-bold text-gray-900">Personal Details</h4>
                      <button 
                        type="button" 
                        onClick={() => setIsEditingProfile(true)}
                        className="text-[#07512E] hover:text-[#054024] font-semibold text-sm tracking-wider flex items-center gap-1.5 cursor-pointer bg-transparent border-none"
                      >
                        <FiEdit2 className="w-3.5 h-3.5 " /> EDIT DETAILS
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-left">
                      <div className="flex   sm: flex-col xl:flex-row   gap-0 xl:gap-4">
                        <p className="text-gray-800 text-[18px] font-[500]  tracking-wider">Full Name -</p>
                        <p className="text-gray-500 font-[500] text-[18px] mt-0.5">{user.name}</p>
                      </div>
                      <div className="flex gap-0 flex-col  md: flex-col xl:flex-row    xl:gap-4">
                        <p className="text-gray-800 text-[18px] font-[500]  tracking-wider">Mobile Number -</p>
                        <p className="text-gray-500 font-[500] text-[18px] mt-0.5">{user.mobile || "Not Provided"}</p>
                      </div>
                      <div className="sm:col-span-2 flex gap-0 flex-col  md: flex-col xl:flex-row    xl:gap-4">
                        <p className="text-gray-800 text-[18px] font-[500]  tracking-wider">Email Address -</p>
                        <p className="text-gray-500 font-[500] text-[18px] mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateInfo} className="bg-[#FAF9F6] border border-[#F0ECE3] rounded-lg p-6 font-sans text-sm space-y-4 text-left">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <h4 className="text-base font-bold text-gray-900">Edit Personal Details</h4>
                      <button 
                        type="button" 
                        onClick={() => setIsEditingProfile(false)}
                        className="text-gray-500 hover:text-gray-700 font-semibold text-xs tracking-wider cursor-pointer bg-transparent border-none"
                      >
                        CANCEL
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                      <div>
                        <label className="block text-gray-600 font-medium mb-1.5">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="w-full p-2.5 bg-white border border-gray-200 rounded outline-none focus:border-[#07512E]" 
                          disabled={loading}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 font-medium mb-1.5">Mobile Phone</label>
                        <input 
                          type="tel" 
                          required 
                          value={mobile} 
                          onChange={(e) => setMobile(e.target.value)} 
                          className="w-full p-2.5 bg-white border border-gray-200 rounded outline-none focus:border-[#07512E]" 
                          disabled={loading}
                        />
                      </div>

                      <div className="col-span-2 flex justify-end gap-3 pt-2">
                        <button 
                          type="button" 
                          onClick={() => setIsEditingProfile(false)} 
                          className="border border-gray-300 px-6 py-2.5 font-semibold rounded cursor-pointer bg-white text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          disabled={loading} 
                          className="bg-[#07512E] text-white px-6 py-2.5 font-semibold rounded hover:bg-[#054024] cursor-pointer"
                        >
                          {loading ? "SAVING..." : "SAVE PROFILE"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Danger zone */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 font-sans text-sm text-left">
                  <h4 className="text-lg font-bold text-red-800 mb-1">Danger Zone</h4>
                  <p className="text-sm text-red-700 mb-4">Deletes all profile files, address entries, and user accounts. This action is permanent.</p>
                  <button 
                    onClick={handleDeleteAccount} 
                    disabled={loading}
                    className="bg-red-600 text-white px-6 py-2.5 font-semibold rounded hover:bg-red-700 cursor-pointer"
                  >
                    DELETE ACCOUNT PERMANENTLY
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: Addresses Book */}
            {activeTab === "addresses" && (
              <div className="animate-fade-in space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-serif text-[#07512E] font-semibold">Saved Addresses</h3>
                  {!isAddingAddress && !isEditingAddress && (
                    <button 
                      onClick={() => setIsAddingAddress(true)}
                      className="bg-[#07512E] text-white px-4 py-2 text-xs font-semibold rounded flex items-center gap-1 cursor-pointer"
                    >
                      <FiPlus /> ADD ADDRESS
                    </button>
                  )}
                </div>

                {/* Inline New Address form */}
                {isAddingAddress && (
                  <form onSubmit={handleSaveNewAddress} className="bg-gray-50 border border-gray-200 rounded p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm text-left">
                    <h4 className="text-sm font-bold text-gray-900 col-span-2">Create New Address Card</h4>
                    <div>
                      <label className="block text-gray-600 mb-1">Address Label</label>
                      <input type="text" name="title" required value={addrForm.title} onChange={handleAddrFormChange} className="w-full p-2 border border-gray-300 rounded outline-none bg-white focus:border-[#07512E]" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Zip/Postal Code</label>
                      <input type="text" name="zipCode" required value={addrForm.zipCode} onChange={handleAddrFormChange} className="w-full p-2 border border-gray-300 rounded outline-none bg-white focus:border-[#07512E]" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-600 mb-1">Street Address</label>
                      <input type="text" name="street" required value={addrForm.street} onChange={handleAddrFormChange} className="w-full p-2 border border-gray-300 rounded outline-none bg-white focus:border-[#07512E]" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">City</label>
                      <input type="text" name="city" required value={addrForm.city} onChange={handleAddrFormChange} className="w-full p-2 border border-gray-300 rounded outline-none bg-white focus:border-[#07512E]" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">State</label>
                      <input type="text" name="state" required value={addrForm.state} onChange={handleAddrFormChange} className="w-full p-2 border border-gray-300 rounded outline-none bg-white focus:border-[#07512E]" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Contact Mobile Number</label>
                      <input type="tel" name="mobile" required value={addrForm.mobile} onChange={handleAddrFormChange} className="w-full p-2 border border-gray-300 rounded outline-none bg-white focus:border-[#07512E]" placeholder="e.g. 9818719997" />
                    </div>
                    <div className="col-span-2 flex gap-3 justify-end mt-2">
                      <button type="button" onClick={() => setIsAddingAddress(false)} className="border border-gray-300 px-4 py-2 rounded bg-white text-gray-700 hover:bg-gray-50 cursor-pointer">CANCEL</button>
                      <button type="submit" disabled={loading} className="bg-[#07512E] text-white px-4 py-2 rounded cursor-pointer">SAVE ADDRESS</button>
                    </div>
                  </form>
                )}

                {/* Inline Edit Address Form */}
                {isEditingAddress && (
                  <form onSubmit={handleSaveEditAddress} className="bg-gray-50 border border-gray-200 rounded p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm text-left">
                    <h4 className="text-sm font-bold text-gray-900 col-span-2">Edit Address Card</h4>
                    <div>
                      <label className="block text-gray-600 mb-1">Address Label</label>
                      <input type="text" required value={isEditingAddress.title} onChange={(e) => setIsEditingAddress({ ...isEditingAddress, title: e.target.value })} className="w-full p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#07512E]" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Zip/Postal Code</label>
                      <input type="text" required value={isEditingAddress.zipCode} onChange={(e) => setIsEditingAddress({ ...isEditingAddress, zipCode: e.target.value })} className="w-full p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#07512E]" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-600 mb-1">Street Address</label>
                      <input type="text" required value={isEditingAddress.street} onChange={(e) => setIsEditingAddress({ ...isEditingAddress, street: e.target.value })} className="w-full p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#07512E]" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">City</label>
                      <input type="text" required value={isEditingAddress.city} onChange={(e) => setIsEditingAddress({ ...isEditingAddress, city: e.target.value })} className="w-full p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#07512E]" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">State</label>
                      <input type="text" required value={isEditingAddress.state} onChange={(e) => setIsEditingAddress({ ...isEditingAddress, state: e.target.value })} className="w-full p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#07512E]" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Contact Mobile Number</label>
                      <input type="tel" required value={isEditingAddress.mobile || ""} onChange={(e) => setIsEditingAddress({ ...isEditingAddress, mobile: e.target.value })} className="w-full p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#07512E]" placeholder="e.g. 9818719997" />
                    </div>
                    <div className="col-span-2 flex gap-3 justify-end mt-2">
                      <button type="button" onClick={() => setIsEditingAddress(null)} className="border border-gray-300 px-4 py-2 rounded bg-white text-gray-700 hover:bg-gray-50 cursor-pointer">CANCEL</button>
                      <button type="submit" disabled={loading} className="bg-[#07512E] text-white px-4 py-2 rounded cursor-pointer">UPDATE ADDRESS</button>
                    </div>
                  </form>
                )}

                {/* Grid List */}
                {!isAddingAddress && !isEditingAddress && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {addresses && addresses.length > 0 ? (
                      addresses.map((addr) => (
                        <div key={addr._id} className="border border-gray-200 rounded p-4 font-sans text-sm flex flex-col justify-between">
                          <div>
                            <p className="font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
                              {addr.title} {addr.isDefault && <span className="bg-[#07512E] text-white px-1.5 py-0.5 text-center rounded text-[9px] font-normal  tracking-wide uppercase">DEFAULT</span>}
                            </p>
                            <p className="text-gray-600">{addr.street}</p>
                            <p className="text-gray-600">{addr.city}, {addr.state} - {addr.zipCode}</p>
                            <p className="text-gray-600">{addr.country}</p>
                            {addr.mobile && (
                              <p className="text-gray-700 font-semibold text-[13px] mt-1.5 flex items-center gap-1.5">
                                <FiPhone className="text-[#07512E]" /> {addr.mobile}
                              </p>
                            )}
                          </div>
                          
                          <div className="border-t border-gray-100 pt-3 mt-4 flex items-center justify-between text-xs font-semibold">
                            <div className="flex gap-4 ">
                              <button 
                                onClick={() => setIsEditingAddress(addr)}
                                className="bg-transparent border-none text-[14px] text-[#07512E] hover:underline cursor-pointer flex items-center gap-1"
                              >
                                <FiEdit3 /> Edit
                              </button>
                              <button 
                                onClick={() => deleteAddress(addr._id)}
                                className="bg-transparent border-none text-[14px] text-red-500 hover:underline cursor-pointer flex items-center gap-1"
                              >
                                <FiTrash2 /> Delete
                              </button>
                            </div>
                            {!addr.isDefault && (
                              <button 
                                onClick={() => setDefaultAddress(addr._id)}
                                className="bg-[#07512E]/10 hover:bg-[#07512E]/20 text-[#07512E] px-2 py-1 rounded transition-colors cursor-pointer"
                              >
                                SET DEFAULT
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic col-span-2 py-6">No saved addresses found. Add one to simplify checkouts!</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: Change Password */}
            {activeTab === "password" && (
              <div className="animate-fade-in space-y-6 text-left">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <div>
                    <h3 className="text-xl font-serif text-[#07512E] font-semibold">Change Account Password</h3>
                    <p className="text-xs text-gray-500 font-sans mt-1">Ensure your account is protected with a strong password.</p>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="bg-[#FAF9F6] border border-[#F0ECE3] rounded-lg p-6 font-sans text-sm space-y-5">
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1.5" htmlFor="oldPassword">
                        Current Account Password
                      </label>
                      <div className="relative max-w-md">
                        <input
                          id="oldPassword"
                          type={showOldPassword ? "text" : "password"}
                          required
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors text-[15px]"
                          placeholder="••••••••"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer flex items-center justify-center"
                        >
                          {showOldPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-1.5" htmlFor="newPassword">
                        New Account Password
                      </label>
                      <div className="relative max-w-md">
                        <input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors text-[15px]"
                          placeholder="••••••••"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer flex items-center justify-center"
                        >
                          {showNewPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-1.5" htmlFor="confirmPassword">
                        Confirm New Password
                      </label>
                      <div className="relative max-w-md">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors text-[15px]"
                          placeholder="••••••••"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer flex items-center justify-center"
                        >
                          {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#07512E] text-white px-8 py-3.5 font-semibold rounded hover:bg-[#054024] cursor-pointer text-sm tracking-wider"
                    >
                      {loading ? "UPDATING PASSWORD..." : "UPDATE PASSWORD"}
                    </button>
                  </div>
                </form>
              </div>
            )}
            {/* TAB 3: My Order History */}
            {activeTab === "orders" && (
              <div className="animate-fade-in space-y-6">
                
                {activeReturnOrder ? (
                  // Inline Return Request Form Panel
                  <form onSubmit={handleSubmitReturnRequest} className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-sans text-sm space-y-6 text-left">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <h4 className="text-[24px] font-bold text-gray-900">
                        {editingReturn ? "Edit Return Request" : "Request Product Return"}: <span className="text-gray-600"> Order ID - #{activeReturnOrder._id.substring(18)}</span> 
                      </h4>
                      <button type="button" onClick={() => { setActiveReturnOrder(null); setEditingReturn(null); }} className="text-gray-500 text-[18px] cursor-pointer hover:text-black">Cancel</button>
                    </div>

                    <div className="space-y-4">
                      <p className="font-semibold text-[18px] text-gray-700">Select items to return & specify quantities:</p>
                      
                      {activeReturnOrder.items.map((item) => {
                        const prodId = item.product?._id || item.product;
                        const state = returnItems[prodId] || {};
                        return (
                          <div key={prodId} className="flex flex-col sm:flex-row gap-4 p-4 bg-white border rounded items-start sm:items-center">
                            <label className="flex items-center gap-2 cursor-pointer shrink-0">
                              <input 
                                type="checkbox" 
                                checked={state.selected}
                                onChange={(e) => handleReturnItemChange(prodId, "selected", e.target.checked)}
                                className="accent-[#07512E] w-4.5 h-4.5"
                              />
                              <span className="font-normal text-[17px] text-gray-900">{item.name}</span>
                            </label>
                            
                            {state.selected && (
                              <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full sm:w-auto text-xs sm:text-sm">
                                <div className="flex  items-center gap-2">
                                  <span className="text-[17px]">Quantity:</span>
                                  <input 
                                    type="number" 
                                    min="1" 
                                    max={state.maxQty} 
                                    value={state.quantity}
                                    onChange={(e) => handleReturnItemChange(prodId, "quantity", Math.min(state.maxQty, Math.max(1, Number(e.target.value))))}
                                    className="p-1 border border-gray-300 rounded text-center w-12"
                                  />
                                  <span className="text-gray-400">(Max {state.maxQty})</span>
                                </div>
                                <input 
                                  type="text" 
                                  placeholder="Reason for return..." 
                                  value={state.reason}
                                  onChange={(e) => handleReturnItemChange(prodId, "reason", e.target.value)}
                                  className="flex-grow p-2 border border-gray-300 text-[17px] rounded bg-[#FAF9F6] outline-none"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <p className="font-semibold text-[18px] text-gray-700">Refund Routing Details</p>
                      
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" checked={refundMethod === "upi"} onChange={() => setRefundMethod("upi")} className="accent-[#07512E]" />
                          <span className="text-[16px]">UPI Transfer</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" checked={refundMethod === "bank"} onChange={() => setRefundMethod("bank")} className="accent-[#07512E]" />
                          <span className="text-[16px]">Bank Account Details</span>
                        </label>
                      </div>

                      {refundMethod === "upi" ? (
                        <div className="max-w-md">
                          <label className="block text-gray-600 mb-1">Enter UPI VPA ID</label>
                          <input type="text" name="upiId" required={refundMethod === "upi"} value={refundDetails.upiId} onChange={handleRefundDetailsChange} placeholder="e.g. mobile@upi" className="w-full p-2.5 border rounded outline-none bg-white focus:border-[#07512E]" />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-600 mb-1">Account Holder Name</label>
                            <input type="text" name="holderName" required={refundMethod === "bank"} value={refundDetails.holderName} onChange={handleRefundDetailsChange} className="w-full p-2.5 border rounded outline-none bg-white focus:border-[#07512E]" />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-1">Bank Name</label>
                            <input type="text" name="bankName" required={refundMethod === "bank"} value={refundDetails.bankName} onChange={handleRefundDetailsChange} className="w-full p-2.5 border rounded outline-none bg-white focus:border-[#07512E]" />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-1">Account Number</label>
                            <input type="text" name="accountNo" required={refundMethod === "bank"} value={refundDetails.accountNo} onChange={handleRefundDetailsChange} className="w-full p-2.5 border rounded outline-none bg-white focus:border-[#07512E]" />
                          </div>
                          <div>
                            <label className="block text-gray-600 mb-1">Bank IFSC Code</label>
                            <input type="text" name="ifsc" required={refundMethod === "bank"} value={refundDetails.ifsc} onChange={handleRefundDetailsChange} className="w-full p-2.5 border rounded outline-none bg-white focus:border-[#07512E]" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t">
                      <button type="button" onClick={() => { setActiveReturnOrder(null); setEditingReturn(null); }} className="border border-gray-300 px-6 py-2.5 rounded cursor-pointer">Cancel</button>
                      <button type="submit" disabled={loading} className="bg-[#07512E] text-white px-6 py-2.5 rounded font-bold cursor-pointer">
                        {loading ? "Submiting..." : editingReturn ? "Update Return" : "Submit Return"}
                      </button>
                    </div>
                  </form>
                ) : (
                  // Orders log list
                  <div className="space-y-6">
                    <h3 className="text-xl font-serif text-[#07512E] font-semibold">Order Logs History</h3>
                    
                    {ordersLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#07512E] mx-auto mb-2"></div>
                        <p className="text-sm text-gray-500">Querying transactions...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <p className="text-sm text-gray-500 italic py-6">You haven't placed any orders yet. Visit our shop to find matching jewelry!</p>
                    ) : (
                      orders.map((o) => (
                        <div key={o._id} className="border border-gray-200 rounded-lg p-5 font-sans text-sm flex flex-col gap-4 text-left">
                          
                          {/* Order Metas Header */}
                          <div className="flex flex-col sm:flex-row justify-between pb-3.5 border-b border-gray-150 gap-2">
                            <div>
                              <p className="font-bold text-gray-900 text-[16px] ">Order ID: <span className="font-mono text-[14px] text-[#0A5230]">#{o._id.substring(18)}</span></p>
                              <p className="text-xs text-gray-500 text-[14px]">Date: {new Date(o.createdAt).toLocaleDateString("en-IN")}</p>
                            </div>
                            <div className="flex gap-2 items-center text-xs">
                              <span className={`px-2.5 py-1 rounded text-[11px] font-bold text-white capitalize ${
                                o.orderStatus === "delivered" ? "bg-green-700" : o.orderStatus === "cancelled" ? "bg-red-600" : "bg-amber-600"
                              }`}>{o.orderStatus}</span>
                              <span className="font-bold text-[15px] text-gray-900">Total:  ₹ {o.totalAmount.toLocaleString("en-IN")}</span>
                            </div>
                          </div>

                          {/* Items summary with images */}
                          <div className="space-y-3">
                            {o.items.map((item, idx) => {
                              const prodImg = getImageUrl(item.product?.images?.[0] || item.product?.images || item.images?.[0]);
                              return (
                                <div key={idx} className="flex items-center justify-between gap-4 p-2 bg-[#FAF9F6] border border-[#F0ECE3] rounded">
                      <div className="flex items-center gap-3">
                                    <img
                                      src={prodImg}
                                      alt={item.name}
                                      className="w-14 h-14 object-cover border border-[#F0ECE3] rounded bg-white shrink-0"
                                    />
                                    <div>
                                      <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                                      {item.variant && item.variant !== "default" && (
                                        <p className="text-[11px] text-amber-700 italic font-medium mt-0.5">{item.variant}</p>
                                      )}
                                      <p className="text-[14px] text-gray-500 ">Qty: {item.quantity} | Price: ₹ {item.price.toLocaleString("en-IN")}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2 shrink-0">
                                    <span className="font-bold text-gray-900 text-sm">₹ {(item.price * item.quantity).toLocaleString("en-IN")}</span>
                                    {o.orderStatus === "delivered" && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setReviewingProduct({ id: item.product?._id || item.product, name: item.name });
                                        }}
                                        className="text-xs bg-[#07512E] hover:bg-[#054024] text-white px-2.5 py-1 font-medium transition-colors cursor-pointer rounded flex items-center gap-1"
                                      >
                                        <FiStar className="w-3 h-3 fill-current" /> Write Review
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Logistics / Tracking logs */}
                          {o.tracking && o.tracking.awb && (
                            <div className="bg-gray-50 rounded p-4 border border-[#F0ECE3] mt-2 text-xs">
                              <p className="font-bold text-gray-800 mb-2">Logistics Tracking Status</p>
                              <p className="mb-1"><b>Carrier:</b> {o.tracking.carrier} | <b>AWB No:</b> <span className="font-mono">{o.tracking.awb}</span></p>
                              
                              {/* Last message timeline log */}
                              {o.tracking.statusHistory && o.tracking.statusHistory.length > 0 && (
                                <p className="text-[#07512E] mt-2 italic font-semibold">
                                  Last Status: "{o.tracking.statusHistory[o.tracking.statusHistory.length - 1].status}" - {o.tracking.statusHistory[o.tracking.statusHistory.length - 1].message}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Action Hooks: Details, Return, Cancel */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-gray-100">
                            <button
                              type="button"
                              onClick={() => setSelectedDetailedOrder(o)}
                              className="text-[#07512E] hover:underline text-sm font-bold tracking-wider cursor-pointer"
                            >
                              VIEW DETAILS & INVOICE
                            </button>
                            
                            <div className="flex gap-2 text-left">
                               {o.orderStatus === "delivered" && (() => {
                                 const orderReturn = returns.find(r => 
                                   (r.orderId?._id || r.orderId || r.order?._id || r.order) === o._id
                                 );
                                 if (orderReturn) {
                                   return (
                                     <div className="flex items-center gap-2">
                                       <span className={`px-2.5 py-1.5 rounded text-[11px] font-bold text-white capitalize ${
                                         orderReturn.status === "refunded" ? "bg-green-700" : orderReturn.status === "rejected" ? "bg-red-600" : "bg-amber-650"
                                       }`}>
                                         Return: {orderReturn.status}
                                       </span>
                                       {orderReturn.status === "pending" && (
                                         <button 
                                           type="button"
                                           onClick={() => handleOpenReturnForm(o, orderReturn)}
                                           className="border border-[#07512E] text-[#07512E] hover:bg-[#07512E] hover:text-white font-semibold px-3 py-1.5 rounded text-xs transition-all cursor-pointer bg-white"
                                         >
                                           EDIT RETURN
                                         </button>
                                       )}
                                     </div>
                                   );
                                 }
                                 return (
                                   <button 
                                     type="button"
                                     onClick={() => handleOpenReturnForm(o)}
                                     className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded text-xs transition-colors cursor-pointer"
                                   >
                                     REQUEST RETURN
                                   </button>
                                 );
                               })()}
                              {["pending", "confirmed"].includes(o.orderStatus) && (
                                <button 
                                  type="button"
                                  onClick={() => handleCancelOrder(o._id)}
                                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded text-xs transition-colors cursor-pointer"
                                >
                                  CANCEL ORDER
                                </button>
                              )}
                            </div>
                          </div>

                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            )}

            {/* TAB 4: Track Returns */}
            {activeTab === "returns" && (
              <div className="animate-fade-in space-y-6">
                <h3 className="text-xl font-serif text-[#07512E] font-semibold">My Product Returns Logs</h3>

                {returnsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#07512E] mx-auto mb-2"></div>
                    <p className="text-xs text-gray-500">Querying request logs...</p>
                  </div>
                ) : returns.length === 0 ? (
                  <p className="text-sm text-gray-500 italic py-6">No return requests on file.</p>
                ) : (
                  returns.map((r) => (
                    <div key={r._id} className="border border-gray-200 rounded-lg p-5 font-sans text-sm flex flex-col gap-4 text-left">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div>
                          <p className="font-bold text-gray-900">Return ID: <span className="font-mono text-xs text-[#0A5230]">#{r._id.substring(18)}</span></p>
                          <p className="text-xs text-gray-500">Submitted: {new Date(r.createdAt).toLocaleDateString("en-IN")}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold text-white capitalize ${
                          r.status === "refunded" ? "bg-green-700" : r.status === "rejected" ? "bg-red-600" : "bg-amber-600"
                        }`}>{r.status}</span>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-xs">Products Returned:</p>
                        {r.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <div>
                              <p className="font-semibold text-gray-900">{item.name} (x{item.quantity})</p>
                              <p className="text-gray-400">Reason: "{item.reason}"</p>
                            </div>
                            <span className="font-semibold text-gray-900">₹ {(item.price * item.quantity).toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>

                      {/* Refund type */}
                      <div className="bg-gray-50 p-3.5 rounded text-xs mt-2 border border-gray-150">
                        <p className="font-semibold">Refund Method: <span className="uppercase text-[#07512E]">{r.refundMethod}</span></p>
                        {r.refundMethod === "upi" ? (
                          <p className="text-gray-600 mt-1">UPI ID: {r.refundDetails?.upiId}</p>
                        ) : (
                          <p className="text-gray-600 mt-1">
                            Bank: {r.refundDetails?.bankName} | Ac No: {r.refundDetails?.accountNo} | Holder: {r.refundDetails?.holderName}
                          </p>
                        )}
                        {r.adminNotes && (
                          <p className="border-t border-gray-200 pt-2.5 mt-2.5 text-[#07512E] font-medium italic">
                            Admin Response Notes: "{r.adminNotes}"
                          </p>
                        )}
                      </div>

                    </div>
                  ))
                )}

              </div>
            )}

          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedDetailedOrder && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden border border-[#F0ECE3] my-8 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="bg-[#07512E] text-white p-5 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-lg font-serif tracking-wide">Order Details</h3>
                <p className="text-xs text-white/80 font-mono mt-1">ID: #{selectedDetailedOrder._id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetailedOrder(null)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-left">
              
              {/* Order Metadata and Status */}
              <div className="flex flex-wrap justify-between items-center gap-4 bg-[#FAF9F6] p-4 border border-[#F0ECE3] rounded">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Date Placed</p>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">
                    {new Date(selectedDetailedOrder.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Payment Status</p>
                  <p className="text-sm font-bold capitalize mt-0.5 text-gray-800">{selectedDetailedOrder.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Order Status</p>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold text-white capitalize mt-1 ${
                    selectedDetailedOrder.orderStatus === "delivered" ? "bg-green-700" : selectedDetailedOrder.orderStatus === "cancelled" ? "bg-red-600" : "bg-amber-600"
                  }`}>
                    {selectedDetailedOrder.orderStatus}
                  </span>
                </div>
              </div>

              {/* Products List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#07512E] border-b pb-1 font-serif">Product Details</h4>
                {selectedDetailedOrder.items.map((item, idx) => {
                  const prodImg = getImageUrl(item.product?.images?.[0] || item.product?.images || item.images?.[0]);
                  return (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={prodImg}
                          alt={item.name}
                          className="w-14 h-14 object-cover border border-[#F0ECE3] rounded bg-[#FAF9F6]"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                          {item.variant && item.variant !== "default" && (
                            <p className="text-[11px] text-amber-700 italic font-medium mt-0.5">{item.variant}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} @ ₹ {item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">
                        ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Shipping Address and Payment Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-[#07512E] border-b pb-1 font-serif">Shipping Address</h4>
                  <p className="text-xs text-gray-800 leading-relaxed font-sans mt-1">
                    {selectedDetailedOrder.shippingAddress?.street}, <br />
                    {selectedDetailedOrder.shippingAddress?.city}, {selectedDetailedOrder.shippingAddress?.state} - {selectedDetailedOrder.shippingAddress?.zipCode} <br />
                    {selectedDetailedOrder.shippingAddress?.country || "India"}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Method: <span className="font-semibold text-gray-700">{selectedDetailedOrder.shippingMethod || "Standard Delivery"}</span>
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-[#07512E] border-b pb-1 font-serif">Payment Method</h4>
                  <p className="text-xs text-gray-800 font-sans mt-1">
                    {selectedDetailedOrder.paymentMethod || "UPI/Online payment"}
                  </p>
                  
                  {/* Cost Summary Breakdown */}
                  <div className="pt-4 space-y-1 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Items Subtotal:</span>
                      <span>₹ {(selectedDetailedOrder.totalAmount - (selectedDetailedOrder.shippingCost || 0)).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping Fee:</span>
                      <span>₹ {(selectedDetailedOrder.shippingCost || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 border-t pt-1 text-sm mt-1">
                      <span>Grand Total:</span>
                      <span>₹ {selectedDetailedOrder.totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Tracking History Timeline */}
              {selectedDetailedOrder.tracking && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-[#07512E] border-b pb-1 font-serif">Tracking History</h4>
                  
                  {selectedDetailedOrder.tracking.awb && (
                    <p className="text-xs text-gray-600 font-sans">
                      Carrier: <span className="font-semibold">{selectedDetailedOrder.tracking.carrier}</span> | AWB: <span className="font-mono bg-gray-100 px-1 rounded">{selectedDetailedOrder.tracking.awb}</span>
                    </p>
                  )}
                  
                  <div className="space-y-3 pl-3 border-l-2 border-[#07512E]/30 ml-2 mt-2">
                    {selectedDetailedOrder.tracking.statusHistory && selectedDetailedOrder.tracking.statusHistory.length > 0 ? (
                      selectedDetailedOrder.tracking.statusHistory.map((step, idx) => (
                        <div key={idx} className="relative text-xs">
                          {/* Timeline dot */}
                          <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#07512E]" />
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <p className="font-bold text-gray-850 capitalize">{step.status}</p>
                              <p className="text-gray-500 text-[11px] mt-0.5">{step.message}</p>
                            </div>
                            <span className="text-[10px] text-gray-400 shrink-0 font-mono mt-0.5">
                              {step.updatedAt ? new Date(step.updatedAt).toLocaleDateString("en-IN") : ""}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">No tracking updates recorded.</p>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Footer buttons */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedDetailedOrder(null)}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2 rounded text-xs font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>

              <div className="flex gap-2">
                {selectedDetailedOrder.orderStatus === "delivered" && (() => {
                  const orderReturn = returns.find(r => 
                    (r.orderId?._id || r.orderId || r.order?._id || r.order) === selectedDetailedOrder._id
                  );
                  if (orderReturn) {
                    return (
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1.5 rounded text-[11px] font-bold text-white capitalize ${
                          orderReturn.status === "refunded" ? "bg-green-700" : orderReturn.status === "rejected" ? "bg-red-600" : "bg-amber-650"
                        }`}>
                          Return: {orderReturn.status}
                        </span>
                        {orderReturn.status === "pending" && (
                          <button 
                            type="button"
                            onClick={() => {
                              handleOpenReturnForm(selectedDetailedOrder, orderReturn);
                              setSelectedDetailedOrder(null);
                            }}
                            className="border border-[#07512E] text-[#07512E] hover:bg-[#07512E] hover:text-white font-semibold px-3 py-1.5 rounded text-xs transition-all cursor-pointer bg-white"
                          >
                            Edit Return
                          </button>
                        )}
                      </div>
                    );
                  }
                  return (
                    <button 
                      type="button"
                      onClick={() => {
                        handleOpenReturnForm(selectedDetailedOrder);
                        setSelectedDetailedOrder(null); // Close details modal
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded text-xs transition-colors cursor-pointer"
                    >
                      Request Return
                    </button>
                  );
                })()}
                {["pending", "confirmed"].includes(selectedDetailedOrder.orderStatus) && (
                  <button 
                    type="button"
                    onClick={() => {
                      handleCancelOrder(selectedDetailedOrder._id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded text-xs transition-colors cursor-pointer"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Review Submission Modal Overlay */}
      {reviewingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
          <form 
            onSubmit={handleSubmitReview} 
            className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden border border-[#F0ECE3] flex flex-col text-left"
          >
            
            {/* Header */}
            <div className="bg-[#07512E] text-white p-4 flex justify-between items-center">
              <h3 className="text-base font-serif tracking-wide">Write Product Review</h3>
              <button
                type="button"
                onClick={() => setReviewingProduct(null)}
                className="text-white/80 hover:text-white p-1 cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Product Name</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{reviewingProduct.name}</p>
              </div>

              {/* Star Rating selector */}
              <div>
                <label className="block text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setReviewRating(stars)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <FiStar 
                        className={`w-7 h-7 ${
                          stars <= reviewRating 
                            ? "text-[#FFDE59] fill-[#FFDE59]" 
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment text area */}
              <div>
                <label className="block text-xs text-[#303030] font-semibold uppercase tracking-wider mb-1">Your Comment</label>
                <textarea
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details of your experience with this jewelry item..."
                  rows={4}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-gray-200 rounded text-sm focus:outline-none focus:border-[#07512E] font-sans resize-none"
                />
              </div>
            </div>

            {/* Actions Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setReviewingProduct(null)}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingReview}
                className="bg-[#07512E] hover:bg-[#054024] text-white font-semibold px-5 py-2 rounded text-xs transition-colors cursor-pointer"
              >
                {submittingReview ? "SUBMITTING..." : "SUBMIT REVIEW"}
              </button>
            </div>

          </form>
        </div>
      )}

      <Footer />
    </main>
  );
}
