// import { bannerTexts } from "@/constants";

// export const FooterBanner = () => {
//   return (
//     <div className="bg-[#EF4444] w-full flex py-7 text-2xl font-bold text-white pl-24 text-nowrap gap-10 overflow-hidden">
//       {bannerTexts.map((text, index) => {
//         return <p key={index}>{text}</p>;
//       })}
//     </div>
//   );
// };


import { bannerTexts } from "@/constants";

export const FooterBanner = () => {
  return (
    <div className="bg-[#EF4444] w-full py-7 overflow-hidden flex border-y border-white/10">
      <div className="flex animate-marquee whitespace-nowrap gap-10">
        {bannerTexts.map((text, index) => (
          <p key={`a-${index}`} className="text-2xl font-bold text-white uppercase flex items-center gap-10">
            {text}
            <span className="text-white/50">•</span>
          </p>
        ))}
        {bannerTexts.map((text, index) => (
          <p key={`b-${index}`} className="text-2xl font-bold text-white uppercase flex items-center gap-10">
            {text}
            <span className="text-white/50">•</span>
          </p>
        ))}
      </div>
    </div>
  );
};