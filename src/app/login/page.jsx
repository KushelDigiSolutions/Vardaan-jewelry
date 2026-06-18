"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Login logic would go here
    console.log("Login with:", email, password);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFCF9]">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white border border-[#F0ECE3] rounded-xl shadow-lg p-8 sm:p-10 w-full max-w-[440px] luxury-card-hover">
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-serif text-[#07512E] mb-2">Welcome Back</h1>
            <p className="text-[15px] font-sans text-gray-500">Sign in to your Vardaan account</p>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-[14px] font-sans font-medium text-[#303030] mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[14px] font-sans font-medium text-[#303030]" htmlFor="password">
                  Password
                </label>
                <Link href="#forgot" className="text-[13px] font-sans text-[#07512E] hover:underline underline-offset-2">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded outline-none focus:border-[#07512E] transition-colors font-sans text-[15px]"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full mt-2 bg-[#07512E] text-white py-3.5 rounded font-sans font-semibold text-[16px] tracking-wide hover:bg-[#054024] transition-colors cursor-pointer"
            >
              SIGN IN
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-[15px] font-sans text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#07512E] font-medium hover:underline underline-offset-4">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
