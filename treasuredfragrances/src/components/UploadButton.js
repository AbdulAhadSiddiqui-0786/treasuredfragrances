import { useState } from "react";
import { useUploadThing } from "../utils/uploadthing";

export function UploadButton() {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload, isUploading: uploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Upload Completed:", res);
      alert("Upload Completed!");
      setImages(res.map(file => file.url));
      setIsUploading(false);
      setUploadProgress(0);
    },
    onUploadError: (error) => {
      console.error("Upload Error:", error);
      alert(`ERROR! ${error.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    },
    onUploadBegin: (fileName) => {
      console.log("Uploading:", fileName);
      setIsUploading(true);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      await startUpload(files);
    } catch (error) {
      console.error("Error starting upload:", error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Images</h2>
      
      <div className="upload-section">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          id="image-upload"
        />
        <label htmlFor="image-upload" className="upload-label">
          {isUploading ? `Uploading... ${uploadProgress}%` : "Choose Images"}
        </label>
      </div>

      {isUploading && (
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {images.length > 0 && (
        <div className="uploaded-images">
          <h3>Uploaded Images:</h3>
          <div className="image-grid">
            {images.map((url, index) => (
              <div key={index} className="image-item">
                <img src={url} alt={`Uploaded ${index}`} />
                <a href={url} target="_blank" rel="noopener noreferrer">
                  View Full Size
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}