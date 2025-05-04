import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './ImageUploader.css';
import QwqApiService from '../services/api';

const ImageUploader = ({ onProcessingStart, onProcessed, onError }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      onError('Please upload an image file (PNG, JPG, JPEG)');
      return;
    }

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Process the image
    processImage(file);
    
    // Cleanup function to revoke the object URL to avoid memory leaks
    return () => URL.revokeObjectURL(objectUrl);
  }, [onError]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const processImage = async (file) => {
    try {
      onProcessingStart();
      
      // Process the image with the QwQ model via our service
      const result = await QwqApiService.processHomework(file);
      onProcessed(result);
    } catch (error) {
      console.error('Error processing the image:', error);
      onError('Error processing the image. Please try again.');
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    document.getElementById('file-input').click();
  };

  return (
    <div className="image-uploader">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} id="file-input" />
        {
          isDragActive ?
            <p>Drop the image here...</p> :
            <div>
              <p>Drag & drop a math homework image here, or click to select</p>
              <button className="upload-btn" onClick={handleSubmitClick}>Select Image</button>
            </div>
        }
      </div>
      
      {preview && (
        <div className="preview-container">
          <h3>Preview:</h3>
          <img src={preview} alt="Homework preview" className="image-preview" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 