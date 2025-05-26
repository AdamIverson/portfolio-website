require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');
const express = require('express');
const cors = require('cors');

console.log('Starting server with clean implementation...');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Debug logging
console.log('Environment check:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET'
});

// Initialize Express
const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Test endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Photos endpoint
app.get('/api/photos', async (req, res) => {
  try {
    const album = req.query.album || 'italy';
    console.log(`Fetching photos for album: ${album}`);

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: album,
      max_results: 100
    });

    console.log(`Found ${result.resources?.length || 0} resources`);
    res.json(result);
  } catch (error) {
    console.error('Cloudinary API error:', error.message);
    res.status(500).json({
      error: error.message,
      code: error.http_code
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});