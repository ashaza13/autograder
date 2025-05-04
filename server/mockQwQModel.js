/**
 * Mock implementation of QwQ model functionality
 * In a real application, this would be replaced with actual API calls to the QwQ model
 */

// Sample math problems and solutions for mock responses
const sampleProblems = [
  {
    ocr_text: "Find the derivative of f(x) = x^3 + 2x^2 - 5x + 3\nSolution: f'(x) = 3x^2 + 4x - 5",
    evaluation: {
      correct: true,
      feedback: "The derivative is correctly computed. For f(x) = x^3 + 2x^2 - 5x + 3, we have f'(x) = 3x^2 + 4x - 5 by applying the power rule and linearity of differentiation.",
      confidence: 0.98,
      partial_points: 10,
      total_points: 10
    }
  },
  {
    ocr_text: "Solve the equation: 2x + 5 = 13\nSolution: x = 4",
    evaluation: {
      correct: true,
      feedback: "The solution is correct. To solve 2x + 5 = 13, we subtract 5 from both sides to get 2x = 8, then divide by 2 to get x = 4.",
      confidence: 0.99,
      partial_points: 10,
      total_points: 10
    }
  },
  {
    ocr_text: "Find the integral of g(x) = 2x + 3\nSolution: ∫(2x + 3)dx = x^2 + 3x + C",
    evaluation: {
      correct: true,
      feedback: "The integration is performed correctly. The integral of 2x is x^2 and the integral of 3 is 3x. Don't forget to add the constant of integration C.",
      confidence: 0.97,
      partial_points: 10,
      total_points: 10
    }
  },
  {
    ocr_text: "Solve: sin(x) = 1/2 for 0 ≤ x ≤ 2π\nSolution: x = π/6 and x = 5π/6",
    evaluation: {
      correct: true,
      feedback: "The solutions are correct. sin(x) = 1/2 gives x = π/6 + 2nπ or x = 5π/6 + 2nπ. Within the interval [0, 2π], we get x = π/6 and x = 5π/6.",
      confidence: 0.95,
      partial_points: 10,
      total_points: 10
    }
  },
  {
    ocr_text: "Calculate lim(x→0) (sin(x)/x)\nSolution: The limit is 1",
    evaluation: {
      correct: true,
      feedback: "The stated limit is correct. This is a well-known limit in calculus, and it can be proven using various methods such as the squeeze theorem or L'Hôpital's rule.",
      confidence: 0.96,
      partial_points: 10,
      total_points: 10
    }
  },
  {
    ocr_text: "Find the derivative of h(x) = e^(x^2)\nSolution: h'(x) = 2xe^(x^2)",
    evaluation: {
      correct: true,
      feedback: "The derivative is computed correctly using the chain rule. If h(x) = e^(x^2), then h'(x) = e^(x^2) · d/dx(x^2) = e^(x^2) · 2x = 2xe^(x^2).",
      confidence: 0.94,
      partial_points: 10,
      total_points: 10
    }
  },
  {
    ocr_text: "Solve the system of equations:\n2x + y = 7\n3x - 2y = 1\nSolution: x = 2, y = 3",
    evaluation: {
      correct: true,
      feedback: "The solution is correct. You can verify by substituting x = 2 and y = 3 into both equations: 2(2) + 3 = 7 ✓ and 3(2) - 2(3) = 6 - 6 = 0 ≠ 1. Wait, that's not right. Let me check... Actually, when x = 2 and y = 3, we get 3(2) - 2(3) = 6 - 6 = 0, not 1. The correct solution should be x = 3, y = 1.",
      confidence: 0.65,
      partial_points: 3,
      total_points: 10
    }
  },
  {
    ocr_text: "Evaluate ∫(0 to π) sin(x) dx\nSolution: ∫(0 to π) sin(x) dx = [-cos(x)](0 to π) = -cos(π) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2",
    evaluation: {
      correct: true,
      feedback: "The evaluation is correct. The indefinite integral of sin(x) is -cos(x). Evaluating at the bounds, we get -cos(π) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2.",
      confidence: 0.98,
      partial_points: 10,
      total_points: 10
    }
  }
];

/**
 * Mock function to simulate OCR and reasoning on a math homework image
 * @param {string} imagePath - Path to the uploaded image
 * @returns {Promise} - Promise with mock OCR and evaluation results
 */
const processHomework = async (imagePath) => {
  // In a real application, this would:
  // 1. Use the QwQ model to perform OCR on the image
  // 2. Use the QwQ model to analyze the mathematical content
  // 3. Return the results
  
  // For the mock, we'll return a random sample problem
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * sampleProblems.length);
      resolve(sampleProblems[randomIndex]);
    }, 1500);
  });
};

module.exports = {
  processHomework
}; 