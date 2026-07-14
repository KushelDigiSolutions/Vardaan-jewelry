import React from "react";

const StarIcon = () => (
  <svg
    className="w-6 h-6 text-[#FFDE59] fill-[#FFDE59] transition-transform duration-300 hover:scale-125"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const GoogleGIcon = () => (
  <svg
    className="w-6 h-6 inline-block shrink-0"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.62-1.07-1.37-1.37-2.18L5.84 14.09z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function GoogleReviewCTA() {
  return (
    <section className="py-16 bg-[#FCFCF9] border-t border-b border-gray-100 overflow-hidden">
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0">
        <div className="bg-[#07512E] w-full rounded-2xl md:rounded-[32px] p-8 md:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden group">
          {/* Subtle elegant background pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Accent light source in corner */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/15 transition-all duration-700"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FFDE59]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FFDE59]/15 transition-all duration-700"></div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            
            {/* Google Badge & Star Ratings */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/15">
              <div className="flex items-center gap-2">
                <GoogleGIcon />
                <span className="text-sm font-medium tracking-wider uppercase text-white/90">
                  Google Review
                </span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-white/20" />
              <div className="flex gap-1">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>

            {/* Typography */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-wide text-[#FFDE59] leading-tight">
              Share Your Vardaan Experience
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
              Your feedback inspires our artisans to continue crafting magnificent, timeless jewelry. Take a moment to rate us on Google and share your experience with others.
            </p>

            {/* CTA Button */}
            <div className="pt-4 w-full sm:w-auto">
              <a
                href="https://g.page/r/CREzg2FefF56EBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFDE59] hover:bg-[#ffe574] text-[#07512E] font-bold text-base md:text-lg tracking-wide rounded-full shadow-lg hover:shadow-xl hover:shadow-[#FFDE59]/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <span>Write A Google Review</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
