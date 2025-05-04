const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// This would be replaced with your actual QwQ model integration
const mockQwQModel = require('./mockQwQModel');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB size limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// API endpoint to process a homework image
app.post('/api/process-homework', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // In a real implementation, you would:
    // 1. Send the image to QwQ for OCR processing
    // 2. Send the OCR text to QwQ for mathematical reasoning/grading
    // 3. Return the results
    
    // For this placeholder, we'll use our mock functionality
    const result = await mockQwQModel.processHomework(req.file.path);
    
    res.json(result);
  } catch (error) {
    console.error('Error processing homework:', error);
    res.status(500).json({ error: 'Failed to process homework image' });
  }
});

// API endpoint to get previously processed homeworks (placeholder)
app.get('/api/processed-homeworks', (req, res) => {
  res.json([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      ocr_text: 'Sample homework 1',
      evaluation: {
        correct: true,
        feedback: 'Good work!',
        confidence: 0.92,
        partial_points: 10,
        total_points: 10
      }
    }
  ]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 