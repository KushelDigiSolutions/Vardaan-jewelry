import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function InstagramFeed() {
  const instaImages = [
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371855/WhatsApp_Image_2026-07-18_at_1.23.16_PM_hpuuoy.jpg",
      link: "https://www.instagram.com/reel/DTj9dN3kwwg/?igsh=N3ltNTZrbGYyeHc="
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371854/WhatsApp_Image_2026-07-18_at_1.28.55_PM_avlmb3.jpg",
      link: "https://www.instagram.com/p/DU7wGpeE-OC/?igsh=YjBqMnl5bTg2c20w"
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784376644/ChatGPT_Image_Jul_18_2026_05_40_13_PM_tom5dg.png",
      link: "https://www.instagram.com/reel/DWllgweE1ep/?igsh=MXhhdDRqNGJrcjBqbg=="
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371854/WhatsApp_Image_2026-07-18_at_1.21.39_PM_xzjcb7.jpg",
      link: "https://www.instagram.com/reel/DTlOBFFk8OW/?igsh=MW5ueHI1ZnV6Y3RpcA=="
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371854/WhatsApp_Image_2026-07-18_at_1.20.59_PM_lxydnm.jpg",
      link: "https://www.instagram.com/reel/DSuxhYjEswDpAMWczD52RhvVyjpCX9EYAvzCIU0/?igsh=NWZqcGVxMWRtNzlk"
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371854/WhatsApp_Image_2026-07-18_at_1.17.41_PM_sbuc9z.jpg",
      link: "https://www.instagram.com/reel/DUITj78E0O9/?igsh=d2EwZTdlNWluMGZ6"
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371853/WhatsApp_Image_2026-07-18_at_1.15.36_PM_f7bskd.jpg",
      link: "https://www.instagram.com/p/DU3Zel5kyUx/?igsh=NTkxNWFlb3k5MHBw"
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371853/WhatsApp_Image_2026-07-18_at_1.13.49_PM_eablo3.jpg",
      link: "https://www.instagram.com/reel/DV-_hmFE9kR/?igsh=aG1qaGkxdWV1azRz"
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371852/WhatsApp_Image_2026-07-18_at_1.06.01_PM_j6wfl1.jpg",
      link: "https://www.instagram.com/p/DW8XSGpkzP2/?igsh=MTJnM3ljYnFoNDg3ZQ=="
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784371852/WhatsApp_Image_2026-07-18_at_1.06.54_PM_dstdez.jpg",
      link: "https://www.instagram.com/reel/DZeYRBTzx9H/?igsh=cTEyazEwMG96ZnNo"
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784375139/WhatsApp_Image_2026-07-18_at_5.14.33_PM_md3jas.jpg",
      link: "https://www.instagram.com/reel/Dae6tEkz0cH/?igsh=M2xka3YxdG1iM205"
    },
    {
      src: "https://res.cloudinary.com/vykqb6hs/image/upload/v1784375139/WhatsApp_Image_2026-07-18_at_5.13.53_PM_xp4bcn.jpg",
      link: "https://www.instagram.com/reel/DahldCtzjNS/?igsh=MWVuajJsMGNwd2VoYQ=="
    }
  ];

  return (
    <section className="py-10 md:py-16 bg-[#07512E]">
      {/* Header Area in container */}
      <div className="w-full max-w-[1192px] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white text-center md:text-left">
            Explore latest <span className="text-[#FDE066]">Instagram Posts</span>
          </h2>
          <Link
          target="_blank"
            href="https://www.instagram.com/vardaan.pureblessing?igsh=MXRzNmJzNWlicjByNQ%3D%3D"
            className="inline-block bg-[#FDE066] text-[#1a1a1a] font-semibold px-8 py-3 rounded-full hover:bg-[#e6c95c] transition-colors whitespace-nowrap"
          >
            Follow us
          </Link>
        </div>
      </div>

      {/* Marquee CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .marquee-container {
          --gap: 8px;
          display: flex;
          flex-direction: column;
          gap: var(--gap);
          overflow: hidden;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          gap: var(--gap);
          padding-right: var(--gap);
        }
        .marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }
        .marquee-right {
          animation: marqueeRight 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          width: 231px;
          height: 210px;
          flex-shrink: 0;
        }

        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}} />

      {/* Marquee Tracks */}
      <div className="marquee-container mt-6">
        {/* Row 1: Sliding Left */}
        <div className="marquee-track marquee-left">
          {[...instaImages.slice(0, 6), ...instaImages.slice(0, 6), ...instaImages.slice(0, 6), ...instaImages.slice(0, 6)].map((item, index) => (
            <Link 
              key={index} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="marquee-item relative overflow-hidden group bg-gray-200 block"
              aria-label={`Instagram post ${index + 1}`}
            >
              <img
                src={item.src}
                alt={`Instagram Post ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 2: Sliding Right */}
        <div className="marquee-track marquee-right">
          {[...instaImages.slice(6, 12), ...instaImages.slice(6, 12), ...instaImages.slice(6, 12), ...instaImages.slice(6, 12)].map((item, index) => (
            <Link 
              key={index} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="marquee-item relative overflow-hidden group bg-gray-200 block"
              aria-label={`Instagram post ${index + 1}`}
            >
              <img
                src={item.src}
                alt={`Instagram Post ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
