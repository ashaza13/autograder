import React, { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageProcessed = (data) => {
    setResult(data);
    setLoading(false);
  };

  const handleProcessingStart = () => {
    setLoading(true);
    setError(null);
    setResult(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Math Homework Autograder</h1>
        <p>Upload handwritten math homework and get automatic grading using QwQ AI</p>
      </header>
      <main className="App-main">
        <ImageUploader 
          onProcessingStart={handleProcessingStart}
          onProcessed={handleImageProcessed} 
          onError={handleError}
        />
        
        {loading && (
          <div className="loading-container">
            <p>Processing image and grading homework...</p>
            <div className="loader"></div>
          </div>
        )}
        
        {error && (
          <div className="error-container">
            <p>Error: {error}</p>
          </div>
        )}
        
        {result && <ResultDisplay result={result} />}
      </main>
      <footer className="App-footer">
        <p>Powered by QwQ AI Model for OCR and Mathematical Reasoning</p>
      </footer>
    </div>
  );
}

export default App; 