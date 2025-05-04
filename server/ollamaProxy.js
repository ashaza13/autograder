const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PROXY_PORT || 5001;

// Ollama URL
const OLLAMA_URL = 'http://localhost:11434/api';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Proxy endpoint for Ollama API
app.post('/api/ollama/:endpoint', async (req, res) => {
  try {
    const { endpoint } = req.params;
    const response = await axios.post(`${OLLAMA_URL}/${endpoint}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Ollama API error:', error.message);
    
    if (error.response) {
      // Return the error response from Ollama
      return res.status(error.response.status).json({
        error: 'Ollama API error',
        details: error.response.data
      });
    }
    
    res.status(500).json({
      error: 'Error communicating with Ollama API',
      message: error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Ollama proxy server running on port ${port}`);
}); 