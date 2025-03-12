import React from "react";
import { Button } from "@/components/ui/button";
import IconUpload from "@/assets/icons/icon-upload.png";

interface ICardAuthenProps {
  id: string;
  label?: string;
  image: string;
  imagePreview: string | null;
  setImagePreview: (value: string | null) => void;
  setImageFlie: (value: File | undefined) => void;
}

const CardAuthen: React.FC<ICardAuthenProps> = (props) => {
  const { id, label, image, imagePreview, setImagePreview, setImageFlie } =
    props;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFlie(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        console.log("imageUrl : ", imageUrl);
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
      // setFileImage(file);
    }
  };

  return (
    <div className="flex flex-col border border-gray-300 rounded-[8px] p-[12px] gap-2">
      {label && <p className="font-semibold text-[16px]">{label}</p>}
      <div>
        <img
          src={imagePreview ? imagePreview : image}
          className="w-full h-[210px] rounded-[8px]"
          alt="img-id-card"
        />
      </div>

      <Button
        variant="ghost"
        type="button"
        className="bg-gray-50 w-full flex items-center mt-2"
        onClick={() => document.getElementById(`image-upload-${id}`)?.click()}
      >
        <img src={IconUpload} width={18} height={18} alt="upload image" />
        <span className="text-primary leading-4">อัปโหลดรูปภาพ</span>
      </Button>

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
        className="hidden"
        id={`image-upload-${id}`}
      />
    </div>
  );
};

export default CardAuthen;
