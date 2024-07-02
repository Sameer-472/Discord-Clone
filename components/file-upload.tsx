"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css"

interface FileUploadProps{
    onChange: (url?: string)=> void;
    endpoint: "messageFile" | "serverImage";
    value: string
}

export const FileUpload = ({endpoint , onChange , value}: FileUploadProps)=>{
    return(
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res)=> {
                // onChange(res?.[0].fileUrl)
            }}
            onUploadError={(error: Error)=>{
                console.log(error)
            }}
        />
    )
}