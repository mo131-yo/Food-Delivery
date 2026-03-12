import { X } from "lucide-react";
import Image from "next/image";

type UploadedImageProps = {
  imageSrc: string;
  setImageSrc: (src: string | null) => void;
};

export const UploadedImage = ({
  imageSrc,
  setImageSrc,
}: UploadedImageProps) => {
  return (
    <div className="h-36 border-dashed border border-[#2563EB33] flex flex-col gap-2 justify-center items-center bg-[#2563EB0D] relative rounded-md">
      <div>
        <Image
          src={imageSrc}
          alt="Uploaded Image"
          layout="fill"
          objectFit="cover"
        />
        <button
          className="bg-background absolute z-10 right-4 top-4 py-2 px-2 rounded-full"
          onClick={() => setImageSrc(null)}
        >
          <X color="#18181B" strokeWidth={1} />
        </button>
      </div>
    </div>
  );
};
