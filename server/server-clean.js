const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// Load environment variables first
dotenv.config();
console.log('Starting server with clean implementation...');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5001; // Use a different port to avoid conflicts

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Simple CORS setup - use only ONE approach
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Basic middleware
app.use(express.json());

// Simple test endpoint
app.get('/api/hello', (req, res) => {
  console.log('Hello endpoint hit');
  res.json({ message: 'Hello from Express!' });
});

// Photos endpoint
app.get('/api/photos', async (req, res) => {
  console.log('Cloudinary config:', {
    cloudName: cloudinary.config().cloud_name,
    apiKeyExists: !!cloudinary.config().api_key,
    apiSecretExists: !!cloudinary.config().api_secret
  });
  try {
    const album = req.query.album || 'italy';
    console.log(`Fetching photos for album: ${album}`);

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: album, // FIXED: Use the album from query parameter
      max_results: 100
    });

    console.log(`Found ${result.resources?.length || 0} resources`);
    res.json(result);
  } catch (error) {
    console.error('Cloudinary API error details:', {
      message: error.message,
      code: error.http_code,
      details: error.error ? JSON.stringify(error.error) : 'No additional details',
      stack: error.stack
    });

    res.status(500).json({
      error: error.message,
      code: error.http_code,
      details: error.error
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});