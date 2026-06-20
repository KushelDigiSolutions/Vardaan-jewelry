"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Signup logic would go here
    console.log("Signup with:", formData);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFCF9]">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white border border-[#F0ECE3] rounded-xl shadow-lg p-8 sm:p-10 w-full max-w-[500px] luxury-card-hover">
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-serif text-[#07512E] mb-2">Create Account</h1>
            <p className="text-[15px] font-sans text-gray-500">Join Vardaan for an exclusive luxury experience</p>
          </div>
          
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
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
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full mt-4 bg-[#07512E] text-white py-3.5 rounded font-sans font-semibold text-[16px] tracking-wide hover:bg-[#054024] transition-colors cursor-pointer"
            >
              CREATE ACCOUNT
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-[15px] font-sans text-gray-600">
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
