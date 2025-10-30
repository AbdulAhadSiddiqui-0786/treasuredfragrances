import { generateReactHelpers } from "@uploadthing/react";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const { useUploadThing, uploadFiles } = generateReactHelpers({
  url: `${URL}/uploadthing`,
});