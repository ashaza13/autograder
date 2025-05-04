import axios from 'axios';

// Our proxy server for Ollama communications
const PROXY_URL = 'http://localhost:5001/api/ollama';
// Backend API endpoint for image processing
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Service for interacting with the QwQ model via Ollama
 */
const QwqApiService = {
  /**
   * Process a math homework image using the QwQ model
   * @param {File} imageFile - The image file to process
   * @returns {Promise} - Promise with the processing results
   */
  processHomework: async (imageFile) => {
    try {
      // Step 1: Convert the image to base64
      const base64Image = await convertImageToBase64(imageFile);
      
      // Step 2: Use OCR to extract text from the image
      const ocrText = await performOCR(base64Image);
      
      // Step 3: Evaluate the mathematical work using the QwQ model
      const evaluation = await evaluateMathWork(ocrText);
      
      // Step 4: Combine the results
      return {
        ocr_text: ocrText,
        evaluation: evaluation
      };
    } catch (error) {
      console.error('Error processing homework:', error);
      throw error;
    }
  },
  
  /**
   * Get a list of previously processed homeworks (if implemented)
   * @returns {Promise} - Promise with the list of processed homeworks
   */
  getProcessedHomeworks: async () => {
    try {
      const response = await axios.get(`${API_URL}/processed-homeworks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching processed homeworks:', error);
      throw error;
    }
  },
};

/**
 * Convert an image file to base64 string
 * @param {File} imageFile - The image file to convert
 * @returns {Promise<string>} - Promise with the base64 string
 */
const convertImageToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Use the QwQ model to perform OCR on the image
 * @param {string} base64Image - The base64-encoded image
 * @returns {Promise<string>} - Promise with the extracted text
 */
const performOCR = async (base64Image) => {
  try {
    const response = await axios.post(`${PROXY_URL}/generate`, {
      model: 'qwq',
      prompt: 'Please perform OCR on this image and extract all the mathematical expressions and workings:',
      images: [base64Image],
      stream: false
    });
    
    return response.data.response.trim();
  } catch (error) {
    console.error('OCR error:', error);
    throw new Error('Failed to perform OCR on the image');
  }
};

/**
 * Evaluate the mathematical work using the QwQ model
 * @param {string} ocrText - The extracted text from OCR
 * @returns {Promise<Object>} - Promise with the evaluation results
 */
const evaluateMathWork = async (ocrText) => {
  try {
    const response = await axios.post(`${PROXY_URL}/generate`, {
      model: 'qwq',
      prompt: `Evaluate the following math homework solution and determine if it is correct. 
               Provide detailed feedback, a correctness assessment, and a score out of 10:
               
               ${ocrText}`,
      stream: false
    });
    
    // Parse the response to extract structured evaluation data
    return parseEvaluationResponse(response.data.response);
  } catch (error) {
    console.error('Evaluation error:', error);
    throw new Error('Failed to evaluate the mathematical work');
  }
};

/**
 * Parse the LLM's text response into a structured evaluation object
 * @param {string} responseText - The text response from the model
 * @returns {Object} - Structured evaluation object
 */
const parseEvaluationResponse = (responseText) => {
  // Default values in case parsing fails
  let evaluation = {
    correct: false,
    feedback: responseText,
    confidence: 0.5,
    partial_points: 0,
    total_points: 10
  };
  
  try {
    // Look for correctness indicators
    if (/correct|right|valid|accurate/i.test(responseText)) {
      evaluation.correct = true;
      evaluation.partial_points = 10; // Assume full points for correct answers
    }
    
    // Extract score if mentioned (format like "7/10" or "score: 7")
    const scoreMatch = responseText.match(/(\d+)\s*\/\s*10|score:?\s*(\d+)/i);
    if (scoreMatch) {
      const score = parseInt(scoreMatch[1] || scoreMatch[2]);
      evaluation.partial_points = score;
      // If score is high, likely correct
      if (score >= 7) evaluation.correct = true;
    }
    
    // Extract confidence level based on language used
    if (/definitely|certainly|absolutely|clearly/i.test(responseText)) {
      evaluation.confidence = 0.95;
    } else if (/likely|probably|seems|appears/i.test(responseText)) {
      evaluation.confidence = 0.75;
    }
    
    // Extract feedback - use the whole response if no better extraction is possible
    const feedbackMatch = responseText.match(/feedback:?\s*([\s\S]+?)(?:\n\n|\.$|$)/i);
    if (feedbackMatch) {
      evaluation.feedback = feedbackMatch[1].trim();
    }
    
    return evaluation;
  } catch (error) {
    console.error('Error parsing evaluation response:', error);
    return evaluation; // Return default values on error
  }
};

export default QwqApiService; 