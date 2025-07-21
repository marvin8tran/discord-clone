"use-client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20  ">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className={`flex flex-col items-center gap-4 custom-upload-wrapper ${
          value ? "has-file" : ""
        }`}
      >
        {value && (
          <Image
            src={value}
            alt="Uploaded"
            className="w-24 h-24 rounded-md object-cover"
          />
        )}
        <UploadDropzone
          className="custom-uploadthing"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            onChange(res?.[0].ufsUrl);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
      </div>
    </div>
  );
};
