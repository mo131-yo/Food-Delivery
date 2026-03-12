import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { UploadedImage } from "./UploadedImage";

type ImageUploaderProps = {
  imgFile?: File;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ImageUploader = ({
  imgFile,
  onFileChange,
}: ImageUploaderProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (imgFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImageSrc(fileReader.result as string);
      };
      fileReader.readAsDataURL(imgFile);
    } else {
      setImageSrc(null);
    }
  }, [imgFile]);

  if (imageSrc) {
    return <UploadedImage imageSrc={imageSrc} setImageSrc={setImageSrc} />;
  }

  return (
    <div className="h-36 border-dashed border border-[#2563EB33] flex flex-col gap-2 justify-center items-center bg-[#2563EB0D] relative rounded-md">
      <Button className="rounded-full w-9 h-9 bg-background">
        <Image color="#09090B" />
      </Button>
      <p className="text-sm">Choose a file or drag & drop it here</p>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
};
