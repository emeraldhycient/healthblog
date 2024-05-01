import React, { useRef } from "react";
import { Button } from "../Button/Button";

interface ImageUploadProps {
  onImageSelect: (image: File | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log("Selected File:", selectedFile);
    if (selectedFile) {
      onImageSelect(selectedFile);
    } else {
      onImageSelect(null);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="rounded-lg border border-gray border-dashed w-full max-w-md">
        <div className="flex flex-row justify-between p-5">
          <label className="flex flex-row mb-2 text-gray items-center cursor-pointer">
            <div className="ml-2">
              <h3 className="text-sm font-medium text-black">Post Cover</h3>
              <p className="text-xs">PNG, JPG | 10MB max</p>
            </div>
          </label>
          <div className="flex justify-between items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button onClick={handleFileUpload}>
              <p>Upload File</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
