"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: "messageFile" | "serverImage";
    value: string;
}

const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    // Conditional rendering
    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <img src={value} alt="upload" className="rounded-full" />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 absolute top-0 right-0 p-1 rounded-full shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.error("Upload error:", error);
            }}
        />
    );
};

export default FileUpload;
