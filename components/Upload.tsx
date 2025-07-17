"use client";

import { useRef, useState } from "react";
import { XIcon, UploadCloudIcon } from "lucide-react";
import Image from "next/image";

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      file.size <= 5 * 1024 * 1024 &&
      file.type.startsWith("image/")
    ) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Only images under 5MB (jpeg/png/jpg) are allowed.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (
      file &&
      file.size <= 5 * 1024 * 1024 &&
      file.type.startsWith("image/")
    ) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Only images under 5MB (jpeg/png/jpg) are allowed.");
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-blue-400 rounded-lg p-4 flex flex-col items-center justify-center relative w-full max-w-md h-full cursor-pointer mt-2"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />

      {previewUrl ? (
        <div className="relative w-full h-full">
          <Image
            width={500}
            height={500}
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-contain rounded-md"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeImage();
            }}
            className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-red-100"
          >
            <XIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <div className="text-center space-y-2 text-sm text-gray-600">
          <UploadCloudIcon className="mx-auto text-blue-500" size={32} />
          <p>
            <strong>Drag & drop</strong> your file(s) here <br />
            or <span className="text-blue-600 underline">browse</span> to upload
            a file
          </p>
        </div>
      )}
    </div>
  );
}
