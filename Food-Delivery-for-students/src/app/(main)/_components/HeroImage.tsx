import Image from "next/legacy/image";

export const HeroImage = ({ imgSource }: { imgSource: string }) => {
  if (!imgSource) return null;

  return (
    <div className="w-full h-[670px] relative">
      <Image 
        alt="Mountains" 
        src={imgSource} 
        layout="fill" 
        objectFit="cover" 
        priority 
      />
    </div>
  );
};