"use client";

import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useToast } from "../context/ToastContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ContactForm() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Name validation: At least 2 characters
    if (formData.name.trim().length < 2) {
      toast.error("Full Name must be at least 2 characters long.");
      return;
    }

    // 2. Email validation: valid syntax, no double dot, exactly one @
    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const atCount = (email.match(/@/g) || []).length;
    if (!emailRegex.test(email) || email.includes('..') || atCount !== 1) {
      toast.error("Please enter a valid email address (e.g. yourname@domain.com, containing exactly one '@' and no double dots).");
      return;
    }

    // 3. Mobile validation: Exactly 10 digits
    const phone = formData.phone.trim();
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits (e.g., 9876543210).");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: email,
          phone: phone,
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || "Thank you! Your private concierge inquiry has been registered successfully.");
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        toast.error(data.message || "Failed to record inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Failed to send contact inquiry:", err);
      toast.error("Connection failed: Could not reach the server. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-28 lg:px-6 bg-[#FAF9F6] border-t border-gray-100 relative" id="contact-form-section">
      <style jsx global>{`
        #contact-form-section input:-webkit-autofill,
        #contact-form-section input:-webkit-autofill:hover,
        #contact-form-section input:-webkit-autofill:focus,
        #contact-form-section input:-webkit-autofill:active,
        #contact-form-section textarea:-webkit-autofill,
        #contact-form-section textarea:-webkit-autofill:hover,
        #contact-form-section textarea:-webkit-autofill:focus,
        #contact-form-section textarea:-webkit-autofill:active {
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: #ffffff !important;
          transition: background-color 5000s ease-in-out 0s !important;
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-start">
        
        {/* Left Column: Asymmetric Guide sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-0 xl:gap-6 lg:justify-between lg:h-[540px] xl:h-auto lg:sticky lg:top-8 w-full">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] tracking-[0.3em] font-semibold text-amber-600 uppercase">
              Private Commissions
            </span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[34px] xl:text-[48px] font-serif text-[#07512E] font-normal uppercase tracking-wide leading-[1.1]">
              Concierge <br />
              <span className="font-normal text-amber-600">Private Suite</span>
            </h2>
          </div>
          
          <div className="w-12 h-[2px] bg-[#FFDE59] mt-1 lg:mt-0 xl:mt-1" />

          <p className="text-[18px] lg:text-[14px] xl:text-[18px] text-gray-500 font-light leading-relaxed lg:leading-normal xl:leading-relaxed">
            For custom creations and private viewing slots, please outline your design ideas, target materials (rolled gold specifications, custom plating preferences), and date preferences.
          </p>

          <div className="flex flex-col gap-4 lg:gap-3 xl:gap-4 mt-4 lg:mt-0 xl:mt-4 bg-white p-8 lg:p-6 xl:p-8 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden w-full">
            <span className="text-[12px] md:text-[14px] lg:text-[13px] xl:text-[14px] tracking-widest font-semibold text-[#07512E] uppercase">
              Our Security Covenant
            </span>
            <ul className="flex flex-col gap-3 lg:gap-2.5 xl:gap-3 text-[14px] md:text-[16px] lg:text-[13px] xl:text-[16px] text-gray-500 font-light">
              <li className="flex items-center gap-2">
                <FiCheck className="text-amber-600 shrink-0" />
                <span>Custom rolled gold blueprints on request.</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-amber-600 shrink-0" />
                <span className="text-ellipsis overflow-hidden">Certified rolled gold purity & premium finish.</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-amber-600 shrink-0" />
                <span>Fully insured worldwide shipping.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Flat-Line Luxury Form Card */}
        <div className="lg:col-span-8 bg-[#07512E] rounded-xl shadow-[0_20px_50px_rgba(7,81,78,0.15)] p-8 md:p-10 lg:p-8 xl:p-10 relative overflow-hidden w-full text-white border border-white/5 lg:h-[540px] xl:h-auto flex flex-col lg:justify-between">
          {/* Subtle Watermark overlay */}
         <div 
  className="absolute inset-0 bg-no-repeat bg-center bg-cover pointer-events-none mix-blend-screen opacity-[0.1]"
  style={{ 
    backgroundImage: `url('https://res.cloudinary.com/dd9tagtiw/image/upload/v1781515128/a29bc3df60dd42fbfd5b10b5b93b4efd38995dd5_clck27.png')`
  }}
/>

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in gap-6">
              {/* Wax Seal check badge */}
              <div className="w-16 h-16 rounded-full bg-[#FFDE59] text-[#07512E] flex items-center justify-center shadow-2xl font-serif text-2xl font-bold animate-bounce border-2 border-white/10">
                V
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[28px] md:text-[32px] text-[#FFDE59] uppercase tracking-wide">
                  Concierge Notified
                </h3>
                <p className="text-[18px] text-gray-300 font-light max-w-md leading-relaxed mt-2">
                  Thank you for your request. A private consultant has been assigned and will reply to your submission within 12 hours.
                </p>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#FFDE59] hover:bg-[#e6c543] text-[#07512E] font-semibold text-[12px] md:text-[14px] tracking-widest px-8 py-4 uppercase rounded shadow transition-colors cursor-pointer mt-4"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 lg:gap-0 xl:gap-10 lg:h-full lg:justify-between">
              
              {/* Form Title */}
              <div className="flex flex-col gap-2.5 lg:gap-1 xl:gap-2.5">
                <span className="text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] tracking-widest font-semibold text-[#FFDE59] uppercase">
                  Write to us
                </span>
                <h2 className="text-[28px] md:text-[40px] lg:text-[30px] xl:text-[40px] font-serif text-[#FFDE59] font-normal uppercase tracking-wide leading-[1.1]">
                  Private Inquiry Form
                </h2>
                <div className="w-10 h-[2px] bg-[#FFDE59] mt-1 lg:mt-0 xl:mt-1" />
              </div>

              {/* Flat-Line Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 lg:gap-y-6 xl:gap-y-10">
                
                {/* Full Name */}
                <div className="relative flex flex-col pt-4">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-white/20 focus:border-[#FFDE59] py-2 text-sm text-white focus:outline-none transition-colors duration-300 font-light"
                    id="name"
                  />
                  <label 
                    htmlFor="name"
                    className="absolute top-4 left-0 text-xs text-gray-400 font-semibold tracking-widest uppercase transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-0 peer-focus:text-[9px] peer-focus:text-[#FFDE59] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-[#FFDE59]"
                  >
                    Full Name *
                  </label>
                </div>

                {/* Email Address */}
                <div className="relative flex flex-col pt-4">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-white/20 focus:border-[#FFDE59] py-2 text-sm text-white focus:outline-none transition-colors duration-300 font-light"
                    id="email"
                  />
                  <label 
                    htmlFor="email"
                    className="absolute top-4 left-0 text-xs text-gray-400 font-semibold tracking-widest uppercase transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-0 peer-focus:text-[9px] peer-focus:text-[#FFDE59] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-[#FFDE59]"
                  >
                    Email Address *
                  </label>
                </div>

                 {/* Phone Number */}
                <div className="relative flex flex-col pt-4">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-white/20 focus:border-[#FFDE59] py-2 text-sm text-white focus:outline-none transition-colors duration-300 font-light"
                    id="phone"
                  />
                  <label 
                    htmlFor="phone"
                    className="absolute top-4 left-0 text-xs text-gray-400 font-semibold tracking-widest uppercase transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-0 peer-focus:text-[9px] peer-focus:text-[#FFDE59] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-[#FFDE59]"
                  >
                    Phone Number *
                  </label>
                </div>

                {/* Subject */}
                <div className="relative flex flex-col pt-4">
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-white/20 focus:border-[#FFDE59] py-2 text-sm text-white focus:outline-none transition-colors duration-300 font-light"
                    id="subject"
                  />
                  <label 
                    htmlFor="subject"
                    className="absolute top-4 left-0 text-xs text-gray-400 font-semibold tracking-widest uppercase transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-0 peer-focus:text-[9px] peer-focus:text-[#FFDE59] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-[#FFDE59]"
                  >
                    Subject *
                  </label>
                </div>

                {/* Message */}
                <div className="relative flex flex-col pt-4 md:col-span-2">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-white/20 focus:border-[#FFDE59] py-2 text-sm text-white focus:outline-none transition-colors duration-300 font-light resize-none"
                    id="message"
                  />
                  <label 
                    htmlFor="message"
                    className="absolute top-4 left-0 text-xs text-gray-400 font-semibold tracking-widest uppercase transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-0 peer-focus:text-[9px] peer-focus:text-[#FFDE59] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-[#FFDE59]"
                  >
                    Detailed Inquiry *
                  </label>
                </div>

              </div>

              {/* Submit Action */}
              <div className="flex justify-center md:justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FFDE59] hover:bg-[#e6c543] text-[#07512E] font-semibold text-[12px] md:text-[14px] tracking-widest px-8 py-3 uppercase rounded shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-[#07512E]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <span className="text-[14px] font-semibold">Submit Inquiry</span>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
