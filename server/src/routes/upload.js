import { UTApi } from "uploadthing/server";

const utApi = new UTApi();

export async function deleteImage(req, res) {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ 
        success: false, 
        error: "Image key is required" 
      });
    }

    const response = await utApi.deleteFiles(key);

    if (!response.success) {
      throw new Error('Failed to delete file from UploadThing');
    }

    return res.status(200).json({ 
      success: true, 
      message: "Image deleted successfully" 
    });

  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}