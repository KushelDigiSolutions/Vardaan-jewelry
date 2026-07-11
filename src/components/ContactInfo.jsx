"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall, FiMail, FiMapPin, FiClock, FiChevronRight } from "react-icons/fi";

export default function ContactInfo() {
  const channels = [
    {
      icon: FaWhatsapp,
      title: "Click here for Chat ",
      value: "",
      href: "https://wa.me/+919217042525",
      desc: "Connect instantly max response time 24hr"
    },
    {
      icon: FiMail,
      title: "Write to Vardaan",
      value: "vardaan.1225@gmail.com",
      href: "mailto:vardaan.1225@gmail.com",
      desc: "Share your experiences and queries.Share your experiences /feedback"
    },
    // {
    //   icon: FiMapPin,
    //   title: "Atelier Showroom",
    //   value: "New Delhi, India",
    //   href: "#contact-form-section",
    //   desc: "Experience our premium Rolled Gold lines."
    // }
  ];

  return (
    <section className="py-16 lg:py-28 lg:px-6  bg-[#FCFCF9]">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center lg:items-start xl:items-center">
        
        {/* Column 1: Staggered Image Showcase (Left - 4 columns) */}
        <div className="lg:col-span-4 relative flex items-center justify-center py-6 lg:py-0 xl:py-6">
          {/* Gold offset frame backdrop */}
          <div className="absolute inset-4 lg:inset-0 xl:inset-4 border border-[#FFDE59]/25 rounded-xl lg:translate-x-3 lg:translate-y-0 xl:translate-x-4 xl:-translate-y-4 hidden sm:block pointer-events-none z-0 lg:h-[414px] xl:h-auto" />
          
          {/* Showroom Image */}
          <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[414px] xl:h-auto xl:aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-gray-100 z-10 hover:scale-[1.01] transition-transform duration-500 lg:mt-4 xl:mt-0 lg:-translate-x-1 xl:translate-x-0">
            <img 
            src="./talkimg.png"
              // src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop" 
              alt="Boutique Private Suite" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Column 2: Sideways-Sliding Contact Cards (Center - 4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-0 xl:gap-6 lg:justify-between lg:h-[430px] xl:h-auto w-full">
          {channels.map((chan, idx) => {
            const Icon = chan.icon;
            const Component = chan.href ? "a" : "div";
            return (
              <Component
                key={idx}
                target="_blank"
                href={chan.href}
                className="bg-[#053D22] border border-white/5 p-6 lg:p-5 xl:p-6 rounded-lg shadow-xl flex items-start gap-4 lg:gap-3 xl:gap-4 transition-transform duration-300 transform hover:translate-x-3 hover:border-[#FFDE59]/40 text-white group w-full"
              >
                {/* Gold ring icon wrapper */}
                <div className="w-10 h-10 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full border border-[#FFDE59]/10 group-hover:border-[#FFDE59] flex items-center justify-center shrink-0 transition-colors duration-500">
                  <div className="w-7 h-7 lg:w-6 lg:h-6 xl:w-7 xl:h-7 rounded-full bg-[#07512E] text-[#FFDE59] flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 lg:w-4 lg:h-4 xl:w-4.5 xl:h-4.5" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <span className="text-[12px] md:text-[14px] hover:underline bg-[black]/40 p-2 rounded-2xl text-center lg:text-[12px] xl:text-[14px] tracking-widest text-[#FFDE59] uppercase font-semibold">
                    {chan.title}
                  </span>
                  <span className="font-serif text-[14px] sm:text-[16px] md:text-[20px] lg:text-[15px] xl:text-[20px] font-medium tracking-wide lg:tracking-normal xl:tracking-wide whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap lg:break-all xl:break-normal group-hover:text-amber-300 transition-colors mt-0.5">
                    {chan.value}
                  </span>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[13px] xl:text-[18px] text-gray-300 font-light mt-0.5 leading-relaxed lg:leading-normal xl:leading-relaxed">
                    {chan.desc}
                  </p>
                </div>
              </Component>
            );
          })}
        </div>

        {/* Column 3: Operating Hours & Direct Suit CTA (Right - 4 columns) */}
        <div className="lg:col-span-4 flex flex-col items-start gap-6 lg:gap-0 xl:gap-6 lg:justify-between lg:h-[430px] xl:h-auto pl-0 lg:pl-0 xl:pl-6 w-full">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] tracking-widest font-medium text-amber-600 uppercase">
              Book your video call Appointment
            </span>
            <h3 className="text-[24px] lg:text-[30px]  font-serif text-[#07512E]  font-medium leading-[1.5] uppercase tracking-wide">
              Get Personalized Jewellery Assistance  <br />
              <span className="font-normal text-amber-600">from Anywhere</span>
            </h3>
          </div>
          
          <div className="w-12 h-[2px] bg-[#FFDE59] mt-1 lg:mt-0 xl:mt-1" />

          {/* <div className="flex gap-4 lg:gap-3 xl:gap-4 items-start w-full bg-[#FAF9F6] border border-gray-150/80 p-6 lg:p-4 xl:p-6 rounded-lg mt-2 lg:mt-0 xl:mt-2">
            <FiClock className="text-amber-600 w-6 h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[20px] lg:text-[17px] xl:text-[20px] font-semibold text-[#07512E] tracking-wider">Atelier Hours</span>
              <span className="text-[18px] lg:text-[14px] xl:text-[18px] text-gray-600 font-light mt-1 lg:mt-0.5 xl:mt-1">Mon - Sat: 11:00 AM - 7:30 PM</span>
              <span className="text-[12px] lg:text-[11px] xl:text-[12px] text-gray-400 font-light italic mt-1 lg:mt-0.5 xl:mt-1">Sundays Closed</span>
            </div>
          </div> */}

          <p className="text-[18px] lg:text-[13px] xl:text-[18px] text-gray-500 font-light leading-relaxed lg:leading-normal xl:leading-relaxed mt-2 lg:mt-0 xl:mt-2">
          Book a one-on-one video consultation with our jewellery experts and explore Vardaan's collections from the comfort of your home. Whether you're shopping for yourself, selecting the perfect gift, or looking for styling advice, we'll help you find pieces that suit your style and occasion.
          </p>

          <a 
            href="#contact-form-section"
            className="flex items-center gap-2 text-[14px] lg:text-[13px] xl:text-[14px] font-serif font-semibold text-[#07512E] hover:text-amber-600 transition-colors group mt-2 lg:mt-0 xl:mt-2 w-full"
          >
            <span>Get your appointment now</span>
            <FiChevronRight className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
