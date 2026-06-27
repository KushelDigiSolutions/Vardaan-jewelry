import Image from "next/image";
import Link from "next/link";

export default function CosmicCreations() {
  return (
    <section className="w-full relative bg-[#07512E]">
      {/* Background Necklace Image Overlay (Desktop Exact Dimensions) */}
      <img 
        src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781526961/png-transparent-earring-chain-necklace-jewellery-charms-pendants-necklace-gemstone-pendant-ring-removebg-preview_1_udlcwy.png" 
        alt="" 
        className="absolute z-0 pointer-events-none object-contain hidden lg:block"
        style={{ 
          width: '322px', 
          height: '331px', 
          left: '376px', 
          top: '0px' 
        }}
      />
      {/* Background Necklace Image Overlay (Responsive Mobile/Tablet) */}
      <img 
        src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781526961/png-transparent-earring-chain-necklace-jewellery-charms-pendants-necklace-gemstone-pendant-ring-removebg-preview_1_udlcwy.png" 
        alt="" 
        className="absolute z-0 pointer-events-none object-contain lg:hidden"
        style={{ 
          width: '250px', 
          height: '250px', 
          opacity: 0.10, 
          right: '0px', 
          top: '0px' 
        }}
      />

      {/* Main Alignment Container (to match other sections) */}
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 flex flex-col md:flex-row min-h-[500px] lg:min-h-[700px] relative z-10">
        
        {/* Left side content area */}
        <div className="relative w-full md:w-1/2 flex flex-col justify-center py-10 md:py-16 overflow-hidden">
          
          {/* Text Content */}
          <div className="relative z-10 w-full max-w-[456px] flex flex-col justify-center text-left mx-auto lg:mx-0">
            <p className="text-white/80 font-sans tracking-[0.15em] uppercase text-[16px] sm:text-[24px] mb-4 font-light">
              COSMIC CREATIONS
            </p>
            <h2 className="font-serif text-[32px] sm:text-[40px] text-white mb-6 leading-[1.1]">
              Vardaan Created<br />Necklace
            </h2>
            <p className="font-sans text-white/90 text-[15px] sm:text-[20px] font-normal leading-relaxed mb-8 pr-4 lg:pr-0">
              Shimmering like a trail of stardust in the night sky, 
              the fine jewelry pieces that form the Vardaan 
              Created Diamonds Galaxy Collection highlight the 
              wonder of the universe. Precious metals and 
              laboratory grown diamonds, cut for brilliance, 
              unite in unexpected combinations, bringing 
              unrivaled luminosity to your looks.
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center bg-[#FFDE59] text-[#101010] font-sans font-medium text-[20px] w-[184px] h-[48px] hover:bg-[#e6c543] transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right side spacer for desktop to maintain flex layout balance */}
        <div className="hidden md:block w-1/2"></div>
      </div>

      {/* Right side image area (Bleeding to edge on desktop) */}
      <div className="w-full h-[400px] md:h-auto md:absolute md:top-0 md:right-0 md:w-1/2 md:bottom-0 z-0">
        <img
          src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1781523380/VardaanCreateNecklace_xo448i.png"
          alt="Woman wearing Vardaan necklace"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
