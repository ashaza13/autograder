import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const { ocr_text, evaluation } = result;
  const { correct, feedback, confidence, partial_points, total_points } = evaluation;

  // Function to determine the score class based on the percentage
  const getScoreClass = () => {
    const percentage = (partial_points / total_points) * 100;
    if (percentage >= 80) return 'score-excellent';
    if (percentage >= 60) return 'score-good';
    if (percentage >= 40) return 'score-average';
    return 'score-poor';
  };

  // Format confidence as percentage
  const confidencePercentage = (confidence * 100).toFixed(1);

  return (
    <div className="result-display">
      <h2>Grading Results</h2>
      
      <div className="result-section">
        <h3>OCR Text Extraction</h3>
        <div className="ocr-text">
          {ocr_text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      
      <div className="result-section">
        <h3>Evaluation</h3>
        
        <div className="score-container">
          <div className={`score ${getScoreClass()}`}>
            <span className="score-value">{partial_points}</span>
            <span className="score-total">/{total_points}</span>
          </div>
        </div>
        
        <div className="details-container">
          <div className="detail-item">
            <span className="detail-label">Correctness:</span>
            <span className={`detail-value ${correct ? 'correct' : 'incorrect'}`}>
              {correct ? 'Correct' : 'Incorrect'}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Confidence:</span>
            <span className="detail-value">{confidencePercentage}%</span>
          </div>
        </div>
        
        <div className="feedback-container">
          <h4>Feedback:</h4>
          <p>{feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay; 