import Link from "next/link";

export default function PolicyPage({ eyebrow, title, description, sections }) {
  return (
    <section className="bg-[#FFFDF9]">
      <div className=" text-black">
        <div className="w-full max-w-[1192px] mx-auto px-4 xl:px-0 py-10 md:py-14">
          <div className="flex items-center gap-2 text-[14px] md:text-[15px] text-black/80 mb-5">
            <Link href="/" className="hover:text-[#FFDE59] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-400">{eyebrow}</span>
          </div>
          <h1 className="font-serif text-[#07512E] text-[36px] md:text-[56px] leading-tight font-bold">
            {title}
          </h1>
          <p className="mt-5 max-w-[760px] text-[16px] md:text-[18px] leading-[1.8] text-black/85">
            {description}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[980px] mx-auto px-4 xl:px-0 pb-12 md:pb-10">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-[#E8E0D2] pb-8 last:border-b-0 last:pb-0">
              <h2 className="font-serif text-[#07512E] text-[26px] md:text-[32px] font-semibold mb-4">
                {section.title}
              </h2>
              <div className="space-y-4 text-[16px] md:text-[17px] leading-[1.8] text-[#3A3A3A]">
                {section.content.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
