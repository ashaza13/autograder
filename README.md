# Math Homework Autograder

A web application that helps teachers automatically grade math homework using the QwQ AI model for OCR (Optical Character Recognition) and mathematical reasoning.

## Features

- Upload handwritten math homework images
- Automatic OCR to extract mathematical expressions and work
- AI-powered assessment of mathematical correctness and reasoning
- Detailed feedback and scoring
- User-friendly interface
- Support for self-hosted QwQ model via Ollama

## Technology Stack

- **Frontend**: React.js with modern UI components
- **Backend**: Node.js with Express
- **AI Integration**: QwQ model for OCR and mathematical reasoning via Ollama
- **Image Handling**: Base64 encoding for image processing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Ollama installed with the QwQ model

### Installing Ollama and QwQ Model

1. Install Ollama by following the instructions at [https://ollama.ai](https://ollama.ai)
2. Pull the QwQ model using the command:
   ```
   ollama pull qwq
   ```
3. Verify the model is working:
   ```
   ollama run qwq "What is 2+2?"
   ```

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/math-homework-autograder.git
   cd math-homework-autograder
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd server
   npm install
   cd ..
   ```

### Running the Application

1. Make sure Ollama is running in the background with the QwQ model loaded
   ```
   # Verify Ollama is running
   curl http://localhost:11434/api/tags
   ```

2. Start the backend services (both the main server and the Ollama proxy):
   ```
   cd server
   npm run dev:all
   ```

3. In a new terminal, start the frontend development server:
   ```
   npm start
   ```

4. Open your browser and navigate to http://localhost:3000

## Usage

1. Drag and drop a math homework image into the upload area or click to select a file
2. The app will process the image through the QwQ model for OCR
3. The QwQ model will then evaluate the mathematical correctness and provide feedback
4. View the detailed assessment including:
   - Extracted text content
   - Correctness evaluation
   - Confidence level
   - Points earned
   - Detailed feedback

## QwQ Model Integration

This application utilizes the QwQ model for two key tasks:
1. OCR to extract handwritten mathematical content from homework images
2. Mathematical reasoning to assess the correctness of the work and provide detailed feedback

The application connects to the QwQ model through Ollama running locally on your machine. The communication flow is:

```
Frontend → Proxy Server → Ollama API → QwQ Model
```

The proxy server handles CORS issues and ensures proper communication between the frontend and Ollama.

## Troubleshooting

- **Ollama Connection Issues**: Ensure Ollama is running using `curl http://localhost:11434/api/tags`
- **Image Processing Errors**: Try with images that have clear handwriting and good lighting
- **Proxy Server Errors**: Check logs in the terminal running the proxy server

## Future Enhancements

- User authentication for teachers and students
- Assignment management and tracking
- Batch processing of multiple homework submissions
- Custom rubric creation for different types of math problems
- Historical data and analytics for teacher insights

## License

This project is licensed under the MIT License - see the LICENSE file for details.
