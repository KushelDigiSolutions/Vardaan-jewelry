import React from 'react';
import { FiAward, FiShield, FiRefreshCw, FiTruck } from 'react-icons/fi';

export default function TrustFeatures() {
  const features = [
    {
      icon: <FiAward className="w-7 h-7 text-[#07512E] stroke-[1.5]" />,
      title: "SIGNATURE GIFT EXPERIENCE",
      description: "More Than Jewellery. A Beautiful Presentation.From the first look to the final reveal, our premium packaging is crafted to create a memorable unboxing experience for every celebration."
    },
    {
      icon: <FiShield className="w-7 h-7 text-[#07512E] stroke-[1.5]" />,
      title: "SECURE PURCHASE",
      description: "Your trust is our legacy. 100% secure payments and insured checkout."
    },
    {
      icon: <FiRefreshCw className="w-7 h-7 text-[#07512E] stroke-[1.5]" />,
      title: "Transparent Shopping Experience",
      description: "What You See Is What You Get We provide genuine product details, clear pricing, and realistic images to ensure you know exactly what you're buying. Your trust is our most valuable asset."
    },
    {
      icon: <FiTruck className="w-7 h-7 text-[#07512E] stroke-[1.5]" />,
      title: "FREE INSURED SHIPPING",
      description: "Complimentary, fully-insured delivery across India directly to your doorstep."
    }
  ];

  return (
    <section className="py-12 md:py-20 lg:px-6 bg-white">
      <div className="w-full max-w-[1192px] mx-auto px-4 lg:px-12 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col  ">
              <div className="w-20 h-20 rounded-full bg-[#f4f8f6] items-center flex  justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-[#07512E] font-bold tracking-wider text-[20px] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-[18px] leading-relaxed max-w-[260px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
