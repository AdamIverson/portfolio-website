const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

console.log('Starting server...');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION:', error);
  // Keep the process running despite the error
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
// Use more specific CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Then use the cors middleware as a backup
app.use(cors(corsOptions));
app.use(express.json());

// Add a try/catch to your API routes to catch any errors
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({ error: 'Server error', message: err.message });
});

// API Endpoint to fetch photos by album/folder
app.get('/api/test-cloudinary', async (req, res) => {
  try {
    // Try the simplest API call to test connection
    const result = await cloudinary.api.usage();
    res.json({ success: true, result });
  } catch (error) {
    console.error('Cloudinary test error:', error);
    res.status(500).json({
      error: error.message,
      code: error.http_code,
      details: error.error ? error.error : 'No additional details'
    });
  }
});

// Environment variable check endpoint
app.get('/api/cloudinary-env-check', (req, res) => {
  const envInfo = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'missing',
    apiKeyExists: !!process.env.CLOUDINARY_API_KEY,
    apiSecretExists: !!process.env.CLOUDINARY_API_SECRET,
    cloudinaryUrlExists: !!process.env.CLOUDINARY_URL,
    // Show first few chars of key for verification without exposing full key
    apiKeyPrefix: process.env.CLOUDINARY_API_KEY ?
      `${process.env.CLOUDINARY_API_KEY.substring(0, 4)}...` : 'missing'
  };

  res.json(envInfo);
});

// Most basic ping test
app.get('/api/cloudinary-ping', async (req, res) => {
  try {
    // Explicitly log the config being used
    console.log('Testing connection with cloud_name:', cloudinary.config().cloud_name);

    // Ping is the simplest call possible
    const result = await cloudinary.api.ping();
    res.json({
      success: true,
      message: 'Connection successful!',
      result
    });
  } catch (error) {
    console.error('Raw error object:', error);
    res.status(500).json({
      success: false,
      message: 'Connection failed',
      errorMessage: error.message,
      errorCode: error.http_code,
      errorType: error.name
    });
  }
});

app.get('/api/photos', async (req, res) => {
  try {
    const album = 'italy';

    if (!album) {
      return res.status(400).json({ error: 'Album parameter is required' });
    }

    console.log(`Fetching photos for album: ${album}`);

    // For retrieving from a specific folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: album + '/',  // Most folder structures in Cloudinary use path prefixes
      max_results: 100
    });

    console.log(`Found ${result.resources.length} resources`);
    res.json(result);
  } catch (error) {
    console.error('Error in /api/photos:', error);
    res.status(500).json({ error: error.message });
  }
});

console.log('About to start listening...');

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});