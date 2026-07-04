"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/context/ToastContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const toast = useToast();

  // Mode state: 'email' | 'forgot' | 'reset'
  const [mode, setMode] = useState("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // Handle Standard Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Successfully logged in! Welcome back to Vardaan.");
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes("suspended")) {
        toast.error(
          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-gray-900 text-[15px]">Account Deactivated</span>
            <span className="text-[13px] font-normal text-gray-600 leading-relaxed">
              Your account has been deactivated by the administrator. Please contact the administrator for further assistance.
            </span>
          </div>
        );
      } else {
        toast.error(err.message || "Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Send Forgot Password OTP request
  const handleForgotPassword = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://vardaan-backend.vercel.app/api";
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");
      setMode("reset");
      toast.success("Password reset OTP sent to email!");
    } catch (err) {
      toast.error(err.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password using OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    // Password Complexity Validation
    const pwd = newPassword;
    const minLength = 8;
    const hasCapital = /[A-Z]/.test(pwd);
    const hasSmall = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

    if (pwd.length < minLength) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    if (!hasCapital) {
      toast.error("Password must contain at least one uppercase letter (capital letter)!");
      return;
    }
    if (!hasSmall) {
      toast.error("Password must contain at least one lowercase letter (small letter)!");
      return;
    }
    if (!hasNumber) {
      toast.error("Password must contain at least one number!");
      return;
    }
    if (!hasSpecial) {
      toast.error("Password must contain at least one special character!");
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://vardaan-backend.vercel.app/api";

      // Check if the dinew password matches the current password
      try {
        const checkRes = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail, password: newPassword }),
        });
        if (checkRes.ok) {
          toast.error("New password cannot be the same as your current password. Please choose a different password.");
          setLoading(false);
          return;
        }
      } catch (checkErr) {
        // Proceed if login check encounters an issue
      }

      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, code: resetOtp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reset failed");
      setMode("email");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully! Please sign in.");
    } catch (err) {
      toast.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFCF9]">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white border border-[#F0ECE3] rounded-xl shadow-lg p-8 sm:p-10 w-full max-w-[440px]  transition-all">

          {/* Render Mode Titles */}
          <div className="text-center mb-8">
            {mode === "email" && (
              <>
                <h1 className="text-[32px] font-serif text-[#07512E] mb-2">Welcome Back</h1>
                <p className="text-[15px] font-sans text-gray-500 font-light">Sign in to your Vardaan account</p>
              </>
            )}
            {mode === "forgot" && (
              <>
                <h1 className="text-[32px] font-serif text-[#07512E] mb-2">Password Recovery</h1>
                <p className="text-[15px] font-sans text-gray-500 font-light">Request password reset OTP code</p>
              </>
            )}
            {mode === "reset" && (
              <>
                <h1 className="text-[32px] font-serif text-[#07512E] mb-2">Reset Password</h1>
                <p className="text-[15px] font-sans text-gray-500 font-light">Submit new account credentials</p>
              </>
            )}
          </div>

          {/* Form Renderings */}
          {mode === "email" && (
            <form onSubmit={handleEmailLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-[13px] sm:text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[13px] sm:text-[15px]"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[13px] sm:text-[14px] font-sans font-medium text-[#303030]" htmlFor="password">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); }}
                    className="text-[13px] font-sans text-[#07512E] bg-transparent border-none outline-none cursor-pointer hover:underline underline-offset-2 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-3 sm:pl-4 pr-12 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[13px] sm:text-[15px]"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer flex items-center justify-center"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-[#07512E] text-white py-3.5 rounded font-sans font-semibold text-[16px] tracking-wide hover:bg-[#054024] transition-colors cursor-pointer flex items-center justify-center"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </form>
          )}

          {mode === "forgot" && (
            <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
              <div>
                <label className="block text-[13px] sm:text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="forgotEmail">
                  Registered Email Address
                </label>
                <input
                  id="forgotEmail"
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[13px] sm:text-[15px]"
                  placeholder="yourname@domain.com"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#07512E] text-white py-3.5 rounded font-sans font-semibold text-[16px] tracking-wide hover:bg-[#054024] transition-colors cursor-pointer flex items-center justify-center"
              >
                {loading ? "SUBMITTING..." : "SEND OTP CODE"}
              </button>
              <button
                type="button"
                onClick={() => { setMode("email"); }}
                className="w-full bg-transparent border-none text-gray-500 hover:text-[#07512E] font-medium text-[14px] cursor-pointer hover:underline mt-2 text-center"
              >
                Back to Sign In
              </button>
            </form>
          )}

          {mode === "reset" && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[13px] sm:text-[14px] font-sans font-medium text-[#303030]" htmlFor="resetOtp">
                    Enter Email OTP Code
                  </label>
                  <button
                    type="button"
                    onClick={() => handleForgotPassword()}
                    disabled={loading}
                    className="text-[13px] font-sans text-[#07512E] bg-transparent border-none outline-none cursor-pointer hover:underline underline-offset-2 font-medium"
                  >
                    Resend OTP?
                  </button>
                </div>
                <input
                  id="resetOtp"
                  type="text"
                  required
                  value={resetOtp}
                  onChange={(e) => setResetOtp(e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[13px] sm:text-[15px]"
                  placeholder="Enter verification code"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-[13px] sm:text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="newPassword">
                  New Account Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showResetPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-3 sm:pl-4 pr-12 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[13px] sm:text-[15px]"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(!showResetPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer flex items-center justify-center"
                  >
                    {showResetPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[13px] sm:text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="confirmPassword">
                  Confirm Account Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-3 sm:pl-4 pr-12 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[13px] sm:text-[15px]"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#07512E] text-white py-3.5 rounded font-sans font-semibold text-[16px] tracking-wide hover:bg-[#054024] transition-colors cursor-pointer flex items-center justify-center"
              >
                {loading ? "UPDATING PASSWORD..." : "RESET PASSWORD"}
              </button>
              <button
                type="button"
                onClick={() => { setMode("email"); }}
                className="w-full bg-transparent border-none text-gray-500 hover:text-[#07512E] font-medium text-[14px] cursor-pointer hover:underline mt-2 text-center"
              >
                Back to Sign In
              </button>
            </form>
          )}

          {/* Under Footer Links */}
          <div className="mt-0 md:mt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center border-t border-gray-100 pt-6">
            <p className="text-[13px] sm:text-[15px] font-sans text-gray-600 font-light flex flex-col sm:block items-center text-center w-full">
              <span>Don't have an account?</span>
              <Link href="/signup" className="text-[#07512E] font-medium hover:underline underline-offset-4 mt-1 sm:mt-0 sm:ml-1">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
