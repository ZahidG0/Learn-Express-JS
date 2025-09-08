import React, { useState } from 'react'

const UploadImage = () => {
    // Get File name
  const [fileName, setFileName] = useState(null);

//   Handle Upload
  const handleUpload = async() => {
    if(!fileName) return alert("Please upload a file");
    const formData = new FormData();
    formData.append("image", fileName);
    try {
        const res = await fetch("http://localhost:5173/upload", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div>
        <div>
            <input type="file" alt='Image' onChange={(e) => setFileName(e.target.files[0])} />
            <button onClick={() => {handleUpload}}>Upload</button>
        </div>
    </div>
  )
}

export default UploadImage;