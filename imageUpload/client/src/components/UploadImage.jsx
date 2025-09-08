import React, { useState } from 'react'

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Handle Upload
  const handleUpload = async () => {
    if (!file) return alert('Please choose a file');
    
    console.log('Selected file:', file);
    const formData = new FormData();
    formData.append('image', file);
    console.log('FormData created with file');

    try {
      setUploading(true);
      console.log('Sending request to server...');
      // NOTE: start your server on port 5000 to avoid Vite default 5173 conflict
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Upload response:', data);
      
      if (res.ok && data && data.file) {
        setImageUrl(data.file);
        console.log('Image URL set:', data.file);
      } else {
        console.error('Upload failed:', data);
        alert(data?.message || data?.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {imageUrl && (
        <div style={{ marginTop: 12 }}>
          <p>Uploaded image:</p>
          <img src={imageUrl} alt="uploaded" style={{ maxWidth: 400 }} />
        </div>
      )}
    </div>
  )
}

export default UploadImage;