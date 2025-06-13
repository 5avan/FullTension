import React, { useState, useEffect } from 'react';
import { Paragraph, Question, UserResponse } from './types';
import './App.css';

const TIME_LIMIT = 30 * 60; // 30 minutes in seconds
const API_URL = 'http://localhost:5000/api/paragraph';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [paragraph, setParagraph] = useState<Paragraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParagraph = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch paragraph');
        }
        const data = await response.json();
        setParagraph(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchParagraph();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => {
        if (prev >= TIME_LIMIT) {
          clearInterval(timer);
          handleSubmit();
          return TIME_LIMIT;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!paragraph) {
    return <div className="error">No paragraph data available</div>;
  }

  const currentQuestion = paragraph.questions[currentQuestionIndex];
  const currentResponse = userResponses.find(
    (r) => r.questionId === currentQuestion?.id
  );

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;

    setUserResponses((prev) => {
      const existingResponse = prev.find((r) => r.questionId === currentQuestion.id);
      
      if (existingResponse) {
        if (currentQuestion.allowMultiple) {
          const newSelectedOptions = existingResponse.selectedOptionIds.includes(optionId)
            ? existingResponse.selectedOptionIds.filter((id) => id !== optionId)
            : [...existingResponse.selectedOptionIds, optionId];
          
          return prev.map((r) =>
            r.questionId === currentQuestion.id
              ? { ...r, selectedOptionIds: newSelectedOptions }
              : r
          );
        } else {
          return prev.map((r) =>
            r.questionId === currentQuestion.id
              ? { ...r, selectedOptionIds: [optionId] }
              : r
          );
        }
      } else {
        return [...prev, { questionId: currentQuestion.id, selectedOptionIds: [optionId] }];
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < paragraph.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return (
      <div className="results-container">
        <h2>Results</h2>
        {/* Results content will be added later */}
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="timer">Time Elapsed: {formatTime(timeElapsed)}</div>
      
      <div className="content-container">
        <div className="paragraph-section">
          <p>{paragraph.text}</p>
        </div>
        
        <div className="question-section">
          {currentQuestion && (
            <>
              <h3>{currentQuestion.text}</h3>
              <div className="options-container">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    className={`option ${
                      currentResponse?.selectedOptionIds.includes(option.id)
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === paragraph.questions.length - 1}
        >
          Next
        </button>
        <button
          onClick={handleSubmit}
          disabled={userResponses.length !== paragraph.questions.length}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App; 