import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';
import QuestionPalette from './QuestionPalette';

function Quiz() {
  const navigate = useNavigate();
  
  // Get active session
  const currentUserStr = localStorage.getItem('quiz_current_user');
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const userEmail = currentUser ? currentUser.email : '';

  // Redirection if quiz completed
  useEffect(() => {
    if (!userEmail) return;
    const completed = localStorage.getItem(`quiz_completed_${userEmail}`) === 'true';
    if (completed) {
      navigate('/result');
    }
  }, [userEmail, navigate]);

  // Quiz States
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isAutoSubmitted, setIsAutoSubmitted] = useState(false);

  const timerRef = useRef(null);

  // Initialize Shuffled Question Order
  useEffect(() => {
    if (!userEmail) return;

    // Check if shuffled order exists in localStorage
    const savedIndicesStr = localStorage.getItem(`quiz_shuffled_indices_${userEmail}`);
    let shuffledIndices = [];

    if (savedIndicesStr) {
      shuffledIndices = JSON.parse(savedIndicesStr);
    } else {
      // Create indices [0, 1, 2, ..., 19]
      const indices = Array.from({ length: questions.length }, (_, i) => i);
      // Fisher-Yates Shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      shuffledIndices = indices;
      localStorage.setItem(`quiz_shuffled_indices_${userEmail}`, JSON.stringify(shuffledIndices));
    }

    // Map indices to actual questions
    const shuffledQs = shuffledIndices.map((idx) => questions[idx]);
    setShuffledQuestions(shuffledQs);

    // Initialize Saved Answers
    const savedAnswersStr = localStorage.getItem(`quiz_answers_${userEmail}`);
    if (savedAnswersStr) {
      setAnswers(JSON.parse(savedAnswersStr));
    }
  }, [userEmail]);

  // Timer Initialization & Synchronization Logic
  useEffect(() => {
    if (!userEmail) return;

    // Fetch or start start_time
    let startTimeStr = localStorage.getItem(`quiz_start_time_${userEmail}`);
    if (!startTimeStr) {
      startTimeStr = String(Date.now());
      localStorage.setItem(`quiz_start_time_${userEmail}`, startTimeStr);
    }
    const startTime = Number(startTimeStr);

    const totalDuration = 20 * 60 * 1000; // 20 minutes in ms

    const updateTimer = () => {
      const elapsed = Date.now() - startTime;
      const remainingMs = Math.max(0, totalDuration - elapsed);
      const remainingSecs = Math.ceil(remainingMs / 1000);

      setTimeLeft(remainingSecs);

      if (remainingSecs <= 0) {
        clearInterval(timerRef.current);
        handleAutoSubmit();
      }
    };

    // Run initial tick
    updateTimer();

    // Start interval
    timerRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [userEmail]);

  // Handle auto-saving of answers
  const handleSelectOption = (questionId, option) => {
    if (!userEmail) return;
    const updatedAnswers = {
      ...answers,
      [questionId]: option
    };
    setAnswers(updatedAnswers);
    localStorage.setItem(`quiz_answers_${userEmail}`, JSON.stringify(updatedAnswers));
  };

  // Helper to calculate score and save result metrics
  const calculateAndStoreResults = (finalAnswers) => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((q) => {
      const answer = finalAnswers[q.id];
      if (answer === undefined || answer === null || answer === '') {
        unanswered++;
      } else if (answer === q.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);

    const result = {
      score: correct,
      total,
      answered: total - unanswered,
      correct,
      wrong,
      unanswered,
      percentage
    };

    localStorage.setItem(`quiz_result_${userEmail}`, JSON.stringify(result));
    localStorage.setItem(`quiz_completed_${userEmail}`, 'true');
  };

  // Manual Submission Flow
  const handleManualSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    calculateAndStoreResults(answers);
    setShowSubmitModal(false);
    navigate('/result');
  };

  // Auto Submission Flow
  const handleAutoSubmit = () => {
    setIsAutoSubmitted(true);
    // Fetch latest answers state from localStorage to ensure we capture final input
    const latestAnswersStr = localStorage.getItem(`quiz_answers_${userEmail}`);
    const latestAnswers = latestAnswersStr ? JSON.parse(latestAnswersStr) : {};
    
    calculateAndStoreResults(latestAnswers);
    setTimeout(() => {
      navigate('/result');
    }, 1500); // 1.5 seconds notification delay to notify user
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePaletteClick = (index) => {
    setCurrentIndex(index);
  };

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const isLowTime = timeLeft <= 120; // 2 minutes left indicator

  if (shuffledQuestions.length === 0) {
    return (
      <div className="text-center mt-4">
        <h3>Loading examination environment...</h3>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;

  return (
    <div className="quiz-container">
      {/* Auto Submit Notification Toast */}
      {isAutoSubmitted && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title" style={{ color: 'var(--danger)' }}>⌛ Time Expired!</h3>
            <p className="modal-text">
              Allocated time has concluded. Your answers are locked, and the exam is being submitted...
            </p>
          </div>
        </div>
      )}

      {/* Main Assessment Panel */}
      <div className="quiz-main">
        {/* Header Details */}
        <div className="quiz-header">
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>Active Test</span>
            <h2 className="quiz-info-title">React Assessment Portal</h2>
          </div>
          
          <div className={`timer-container ${isLowTime ? 'timer-warning' : ''}`}>
            <svg className="timer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Active Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          selectedOption={answers[currentQuestion.id] || ''}
          onSelectOption={handleSelectOption}
        />

        {/* Navigation Buttons */}
        <div className="quiz-actions">
          <button 
            className="btn btn-secondary" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
          >
            ← Previous Question
          </button>
          
          {currentIndex < totalQuestions - 1 ? (
            <button className="btn btn-outline-primary" onClick={handleNext}>
              Next Question →
            </button>
          ) : (
            <button className="btn btn-success" onClick={() => setShowSubmitModal(true)}>
              Submit Examination
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Navigation Palette */}
      <div className="quiz-sidebar">
        <QuestionPalette
          questions={shuffledQuestions}
          currentIndex={currentIndex}
          answers={answers}
          onSelectQuestion={handlePaletteClick}
        />
        <button 
          className="btn btn-danger" 
          onClick={() => setShowSubmitModal(true)} 
          style={{ width: '100%' }}
        >
          Submit Exam
        </button>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Submit Examination?</h3>
            <p className="modal-text">
              You have answered <strong>{Object.keys(answers).length}</strong> out of <strong>{totalQuestions}</strong> questions.
              Are you sure you want to finish and submit your score?
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowSubmitModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleManualSubmit}>
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
