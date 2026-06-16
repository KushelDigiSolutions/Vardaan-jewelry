import React from 'react';
import { FiAward, FiShield, FiRefreshCw, FiTruck } from 'react-icons/fi';

export default function TrustFeatures() {
  const features = [
    {
      icon: <FiAward className="w-7 h-7 text-[#07512E] stroke-[1.5]" />,
      title: "100% CERTIFIED",
      description: "Every diamond and gemstone is certified by leading international labs (GIA, IGI)."
    },
    {
      icon: <FiShield className="w-7 h-7 text-[#07512E] stroke-[1.5]" />,
      title: "SECURE PURCHASE",
      description: "Your trust is our legacy. 100% secure payments and insured checkout."
    },
    {
      icon: <FiRefreshCw className="w-7 h-7 text-[#07512E] stroke-[1.5]" />,
      title: "LIFETIME EXCHANGE",
      description: "Upgrade or exchange your Vardaan heirloom pieces anytime with our lifetime policy."
    },
    {
      icon: <FiTruck className="w-7 h-7 text-[#07512E] stroke-[1.5]" />,
      title: "FREE INSURED SHIPPING",
      description: "Complimentary, fully-insured delivery across India directly to your doorstep."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#f4f8f6] flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-[#07512E] font-bold tracking-wider text-[15px] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-[14.5px] leading-relaxed max-w-[260px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
