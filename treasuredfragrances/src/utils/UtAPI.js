export async function deleteFileFromUploadthing(key) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to delete file');
    }

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}