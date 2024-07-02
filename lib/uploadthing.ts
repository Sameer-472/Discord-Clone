import { ourFileRouter } from "@/app/api/uploadingThings/core";
import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";


   
  export const UploadButton = generateUploadButton<ourFileRouter>();
  export const UploadDropzone = generateUploadDropzone<ourFileRouter>();
