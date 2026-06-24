"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/context/ToastContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submit registration form
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Password Complexity Validation: Min length 8, contains uppercase, lowercase, digit, and special char
    const password = formData.password;
    const minLength = 8;
    const hasCapital = /[A-Z]/.test(password);
    const hasSmall = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (password.length < minLength) {
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
    if (password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      };
      
      await register(payload);
      setOtpSent(true);
      toast.success("Account created! A verification OTP has been sent to your email.");
    } catch (err) {
      toast.error(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  // Submit Email OTP verification
  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: emailOtp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Email verification failed");

      toast.success("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Verification code is invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFCF9]">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white border border-[#F0ECE3] rounded-xl shadow-lg p-8 sm:p-10 w-full max-w-[500px] luxury-card-hover transition-all">
          
          <div className="text-center mb-8">
            {!otpSent ? (
              <>
                <h1 className="text-[32px] font-serif text-[#07512E] mb-2">Create Account</h1>
                <p className="text-[15px] font-sans text-gray-500 font-light">Join Vardaan for an exclusive luxury experience</p>
              </>
            ) : (
              <>
                <h1 className="text-[32px] font-serif text-[#07512E] mb-2">Verify Account</h1>
                <p className="text-[15px] font-sans text-gray-500 font-light">Enter the OTP sent to {formData.email}</p>
              </>
            )}
          </div>
          
          {!otpSent ? (
            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
                    placeholder="John"
                    disabled={loading}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
                    placeholder="Doe"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="mobile">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
                  placeholder="e.g. 9818719997"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
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

              <div>
                <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
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
                className="w-full mt-4 bg-[#07512E] text-white py-3.5 rounded font-sans font-semibold text-[16px] tracking-wide hover:bg-[#054024] transition-colors cursor-pointer flex items-center justify-center"
              >
                {loading ? "CREATING..." : "CREATE ACCOUNT"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtpSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="emailOtp">
                  Enter verification OTP (Sent to Email)
                </label>
                <input
                  id="emailOtp"
                  type="text"
                  required
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px] text-center font-bold tracking-widest"
                  placeholder="Enter OTP"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#07512E] text-white py-3.5 rounded font-sans font-semibold text-[16px] tracking-wide hover:bg-[#054024] transition-colors cursor-pointer flex items-center justify-center"
              >
                {loading ? "VERIFYING..." : "VERIFY ACCOUNT"}
              </button>
            </form>
          )}
          
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-[15px] font-sans text-gray-600 font-light">
              Already have an account?{" "}
              <Link href="/login" className="text-[#07512E] font-medium hover:underline underline-offset-4">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
