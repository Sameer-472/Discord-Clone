import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";
import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";


   
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
