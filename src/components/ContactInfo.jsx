"use client";

import React from "react";
import { FiPhoneCall, FiMail, FiMapPin, FiClock, FiChevronRight } from "react-icons/fi";

export default function ContactInfo() {
  const channels = [
    {
      icon: FiPhoneCall,
      title: "Concierge Helpline",
      value: "+91 98187 19997",
      href: "tel:+919818719997",
      desc: "Connect instantly with our design curators."
    },
    {
      icon: FiMail,
      title: "Write to Atelier",
      value: "info@vardaanjewelry.com",
      href: "mailto:info@vardaanjewelry.com",
      desc: "Send sketches or GIA blueprints queries."
    },
    {
      icon: FiMapPin,
      title: "Atelier Showroom",
      value: "New Delhi, India",
      href: "#contact-form-section",
      desc: "Experience our bridal gold lines."
    }
  ];

  return (
    <section className="py-16 lg:py-28 bg-[#FCFCF9]">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Column 1: Staggered Image Showcase (Left - 4 columns) */}
        <div className="lg:col-span-4 relative flex items-center justify-center py-6">
          {/* Gold offset frame backdrop */}
          <div className="absolute inset-4 border border-[#FFDE59]/25 rounded-xl translate-x-4 -translate-y-4 hidden sm:block pointer-events-none z-0" />
          
          {/* Showroom Image */}
          <div className="relative w-11/12 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-gray-100 z-10 hover:scale-[1.01] transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop" 
              alt="Boutique Private Suite" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Column 2: Sideways-Sliding Contact Cards (Center - 4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          {channels.map((chan, idx) => {
            const Icon = chan.icon;
            const Component = chan.href ? "a" : "div";
            return (
              <Component
                key={idx}
                href={chan.href}
                className="bg-[#053D22] border border-white/5 p-6 rounded-lg shadow-xl flex items-start gap-4 transition-transform duration-300 transform hover:translate-x-3 hover:border-[#FFDE59]/40 text-white group"
              >
                {/* Gold ring icon wrapper */}
                <div className="w-10 h-10 rounded-full border border-[#FFDE59]/10 group-hover:border-[#FFDE59] flex items-center justify-center shrink-0 transition-colors duration-500">
                  <div className="w-7 h-7 rounded-full bg-[#07512E] text-[#FFDE59] flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <span className="text-[12px] md:text-[14px] tracking-widest text-[#FFDE59] uppercase font-semibold">
                    {chan.title}
                  </span>
                  <span className="font-serif text-[14px] sm:text-[16px] md:text-[20px] font-medium tracking-wide whitespace-nowrap group-hover:text-amber-300 transition-colors mt-1">
                    {chan.value}
                  </span>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] text-gray-300 font-light mt-1 leading-relaxed">
                    {chan.desc}
                  </p>
                </div>
              </Component>
            );
          })}
        </div>

        {/* Column 3: Operating Hours & Direct Suit CTA (Right - 4 columns) */}
        <div className="lg:col-span-4 flex flex-col items-start gap-6 pl-0 lg:pl-6">
          <span className="text-[12px] md:text-[14px] tracking-widest font-semibold text-amber-600 uppercase">
            Delhi Showroom
          </span>
          
          <h3 className="text-[32px] md:text-[48px] font-serif text-[#07512E] font-normal leading-[1.1] uppercase tracking-wide">
            Flagship Suite <br />
            <span className="font-normal text-amber-600">Hours</span>
          </h3>
          
          <div className="w-12 h-[2px] bg-[#FFDE59] mt-1" />

          <div className="flex gap-4 items-start w-full bg-[#FAF9F6] border border-gray-150/80 p-6 rounded-lg mt-2">
            <FiClock className="text-amber-600 w-6 h-6 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[18px] font-semibold text-[#07512E] uppercase tracking-wider">Atelier Hours</span>
              <span className="text-[18px] text-gray-600 font-light mt-1">Mon - Sat: 11:00 AM - 7:30 PM</span>
              <span className="text-[12px] text-gray-400 font-light italic mt-1">Sundays Closed</span>
            </div>
          </div>

          <p className="text-[18px] text-gray-500 font-light leading-relaxed mt-2">
            Private consultations are managed through designated VIP suites to ensure a secure, personalized, and comfortable experience.
          </p>

          <a 
            href="#contact-form-section"
            className="flex items-center gap-2 text-[14px] font-serif font-semibold text-[#07512E] hover:text-amber-600 transition-colors uppercase group mt-2"
          >
            <span>Book Private Consultation Suite</span>
            <FiChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
