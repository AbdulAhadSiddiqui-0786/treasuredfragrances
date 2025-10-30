const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

exports.uploadRouter = {
  imageUploader: f({
    image: { maxFileSize: "12MB", maxFileCount: 4 },
  })
    .middleware(async ({ req, res }) => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      console.log("File Name:", file.name);
      console.log("File Size:", file.size);

      // You can save file info to your DB here
      return { uploadedBy: metadata.userId };
    }),
};
