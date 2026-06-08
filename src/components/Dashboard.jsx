import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  
  // Get active session
  const currentUserStr = localStorage.getItem('quiz_current_user');
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const userEmail = currentUser ? currentUser.email : '';

  const [quizState, setQuizState] = useState('new'); // 'new', 'active', 'completed'
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    if (!userEmail) return;

    const startTime = localStorage.getItem(`quiz_start_time_${userEmail}`);
    const completed = localStorage.getItem(`quiz_completed_${userEmail}`) === 'true';
    const resultStr = localStorage.getItem(`quiz_result_${userEmail}`);

    if (completed) {
      setQuizState('completed');
      if (resultStr) {
        setLastResult(JSON.parse(resultStr));
      }
    } else if (startTime) {
      // Double check if timer is actually expired
      const totalDuration = 20 * 60 * 1000;
      const elapsed = Date.now() - Number(startTime);
      if (elapsed >= totalDuration) {
        // Automatically mark as completed if timer expired in background
        localStorage.setItem(`quiz_completed_${userEmail}`, 'true');
        setQuizState('completed');
        // We will compute/save result later or let Quiz page handle it.
        // For safety, load results or show completed state
        if (resultStr) {
          setLastResult(JSON.parse(resultStr));
        }
      } else {
        setQuizState('active');
      }
    } else {
      setQuizState('new');
    }
  }, [userEmail]);

  const handleStartQuiz = () => {
    if (!userEmail) return;
    
    // Clear previous quiz states (if any exist) to start fresh
    localStorage.removeItem(`quiz_start_time_${userEmail}`);
    localStorage.removeItem(`quiz_shuffled_indices_${userEmail}`);
    localStorage.removeItem(`quiz_answers_${userEmail}`);
    localStorage.setItem(`quiz_completed_${userEmail}`, 'false');
    localStorage.removeItem(`quiz_result_${userEmail}`);
    
    // Redirect to quiz page where the timer will be initialized
    navigate('/quiz');
  };

  const handleResumeQuiz = () => {
    navigate('/quiz');
  };

  const handleViewResult = () => {
    navigate('/result');
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dashboard-hero">
        <h1 className="welcome-title">Welcome back, {currentUser?.name}!</h1>
        <p className="welcome-subtitle">
          {quizState === 'active' 
            ? 'You have an active examination session. Resume it to avoid auto-submission!'
            : quizState === 'completed'
            ? 'You have successfully completed your examination. Review your dashboard details below.'
            : 'Ready to evaluate your knowledge? Review the instructions and begin the assessment.'}
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Questions</span>
          <span className="stat-value">20</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Allocated Time</span>
          <span className="stat-value">20 Mins</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Assessed Topics</span>
          <span className="stat-value" style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: 'var(--primary)' }}>
            HTML, CSS, JS, React
          </span>
        </div>
        
        {quizState === 'completed' && lastResult && (
          <div className="stat-card" style={{ borderColor: 'var(--success-hover)' }}>
            <span className="stat-label" style={{ color: 'var(--success-hover)' }}>Your Last Score</span>
            <span className="stat-value" style={{ color: 'var(--success)' }}>
              {lastResult.score} / 20
            </span>
          </div>
        )}
      </div>

      {/* Main Instructions Panel */}
      <div className="instructions-card">
        <h2 className="instructions-title">Examination Guidelines</h2>
        <ul className="instructions-list">
          <li>
            <span className="instruction-num">1</span>
            <span>The examination has a total duration of <strong>20 minutes</strong>. The countdown begins as soon as you click the button below.</span>
          </li>
          <li>
            <span className="instruction-num">2</span>
            <span>Questions are <strong>randomized and shuffled</strong> for each user. However, your order will remain fixed if you refresh or resume.</span>
          </li>
          <li>
            <span className="instruction-num">3</span>
            <span>Your answers are **auto-saved instantly** upon selection. Refreshing, logging out, or closing your browser will **not** lose your selected options.</span>
          </li>
          <li>
            <span className="instruction-num">4</span>
            <span>The timer continues running in the background. Logging out or closing the tab will **not** pause the clock.</span>
          </li>
          <li>
            <span className="instruction-num">5</span>
            <span>If the timer reaches <strong>00:00:00</strong>, the portal will automatically save all inputs, lock the exam, and direct you to the results screen.</span>
          </li>
          <li>
            <span className="instruction-num">6</span>
            <span>Do not copy, paste, or navigate away from the browser context to ensure system integrity.</span>
          </li>
        </ul>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          {quizState === 'new' && (
            <button className="btn btn-primary" onClick={handleStartQuiz}>
              Start Examination
            </button>
          )}
          
          {quizState === 'active' && (
            <>
              <button className="btn btn-primary" onClick={handleResumeQuiz}>
                Resume Active Examination
              </button>
              <button className="btn btn-secondary" onClick={handleStartQuiz}>
                Restart Fresh (Resets current progress)
              </button>
            </>
          )}

          {quizState === 'completed' && (
            <>
              <button className="btn btn-outline-primary" onClick={handleViewResult}>
                View Result Analytics
              </button>
              <button className="btn btn-primary" onClick={handleStartQuiz}>
                Retake Examination
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
