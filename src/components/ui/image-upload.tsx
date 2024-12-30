import React, { ChangeEvent } from "react";
import { Input } from "./input";
import { Label } from "./label";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  defaultImage?: string;
}

const ImageUpload = ({ onChange, defaultImage }: ImageUploadProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Image</Label>
      <div className="space-y-4">
        {defaultImage && (
          <img
            src={defaultImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ImageUpload;