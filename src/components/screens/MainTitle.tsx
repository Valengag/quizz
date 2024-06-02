
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainTitle() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions from the JSON file
    const loadQuestions = async () => {
      try {
        const response = await fetch('../public/questions.json');
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    loadQuestions();
  }, []);
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSliderValue(50); // Reset slider value for the next question
    } else {
      navigate('/Profile');
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>; // Display loading message while questions are being fetched
  }

  return (
    <div className="flex w-full h-full items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-5/6 max-w-md">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-gray-800">TEST PHILOCOGNITION</h2>
          <p className="text-gray-600 mt-2">Question {currentQuestionIndex + 1}/{questions.length}</p>
          <p className="text-gray-800 mt-14 font-bold text-2xl mb-14">
            {questions[currentQuestionIndex]}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <span className="text-gray-600 mr-4">0</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            className="w-2/3 range range-primary"
          />
          <span className="text-gray-600 ml-4">100</span>
        </div>
        <div className="mt-8 flex mt-14 justify-center">
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            VALIDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainTitle;

