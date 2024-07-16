"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css"
import Image from "next/image";

interface FileUploadProps{
    onChange: (url?: string)=> void;
    endpoint: "messageFile" | "serverImage";
    value: string
}

export const FileUpload = ({endpoint , onChange , value}: FileUploadProps)=>{
    const fileType = value?.split(".").pop();
    if(value && fileType != "pdf"){
        return (
            <div className="relative h-20 w-20">
                <img  src={value} alt="upload" className="rounded-full"/>
            </div>
        )
    }
    return(
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res)=> {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error)=>{
                console.log("error is" , error)
            }}
        />
    )
}