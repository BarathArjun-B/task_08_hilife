import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Result() {
  const navigate = useNavigate();

  // Get active session
  const currentUserStr = localStorage.getItem('quiz_current_user');
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const userEmail = currentUser ? currentUser.email : '';

  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
      return;
    }

    const savedResultStr = localStorage.getItem(`quiz_result_${userEmail}`);
    if (savedResultStr) {
      setResult(JSON.parse(savedResultStr));
    } else {
      // If completed but no results computed, redirect back to dashboard
      navigate('/dashboard');
    }
  }, [userEmail, navigate]);

  const handleRetake = () => {
    if (!userEmail) return;

    // Reset all examination tokens for this specific user
    localStorage.removeItem(`quiz_start_time_${userEmail}`);
    localStorage.removeItem(`quiz_shuffled_indices_${userEmail}`);
    localStorage.removeItem(`quiz_answers_${userEmail}`);
    localStorage.setItem(`quiz_completed_${userEmail}`, 'false');
    localStorage.removeItem(`quiz_result_${userEmail}`);

    // Start exam again
    navigate('/quiz');
  };

  const handleGoDashboard = () => {
    navigate('/dashboard');
  };

  if (!result) {
    return (
      <div className="text-center mt-4">
        <h3>Loading assessment result details...</h3>
      </div>
    );
  }

  // Determine feedback message based on percentage
  const getFeedback = (pct) => {
    if (pct >= 85) return { text: 'Outstanding Performance!', color: 'var(--success)' };
    if (pct >= 70) return { text: 'Great Job! Well done.', color: 'var(--primary)' };
    if (pct >= 50) return { text: 'Satisfactory. Keep practicing to improve.', color: 'var(--warning)' };
    return { text: 'Keep learning! Review the topics and try again.', color: 'var(--danger)' };
  };

  const feedback = getFeedback(result.percentage);

  return (
    <div className="result-container">
      <div className="card result-card">
        {/* Results Banner Header */}
        <div className="result-header">
          <span className="result-badge">Assessment Completed</span>
          <h2 className="result-title">Examination Results</h2>
          <p className="result-subtitle">Congratulations, {currentUser?.name || 'Candidate'}! You have completed the test.</p>
        </div>

        {/* Dynamic Circular Score Ring */}
        <div className="score-display-wrapper">
          <div className="score-circle">
            <span className="score-number">{result.score}</span>
            <span className="score-total">/ {result.total}</span>
            <span className="score-percentage" style={{ color: feedback.color }}>{result.percentage}%</span>
          </div>
        </div>

        <h3 style={{ color: feedback.color, fontWeight: 700, marginBottom: '2rem' }}>
          {feedback.text}
        </h3>

        {/* Detailed Metrics Breakdown */}
        <h4 className="metrics-section-title">Performance Breakdown</h4>
        <div className="metrics-grid">
          <div className="metric-bar-card">
            <div className="metric-info">
              <span className="metric-lbl">Correct Answers</span>
              <span className="metric-val" style={{ color: 'var(--success)' }}>{result.correct}</span>
            </div>
            <div className="bar-bg">
              <div 
                className="bar-fill bar-correct" 
                style={{ width: `${(result.correct / result.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="metric-bar-card">
            <div className="metric-info">
              <span className="metric-lbl">Wrong Answers</span>
              <span className="metric-val" style={{ color: 'var(--danger)' }}>{result.wrong}</span>
            </div>
            <div className="bar-bg">
              <div 
                className="bar-fill bar-wrong" 
                style={{ width: `${(result.wrong / result.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="metric-bar-card">
            <div className="metric-info">
              <span className="metric-lbl">Unanswered Questions</span>
              <span className="metric-val" style={{ color: 'var(--text-muted)' }}>{result.unanswered}</span>
            </div>
            <div className="bar-bg">
              <div 
                className="bar-fill bar-unanswered" 
                style={{ width: `${(result.unanswered / result.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="metric-bar-card">
            <div className="metric-info">
              <span className="metric-lbl">Completed Percentage</span>
              <span className="metric-val" style={{ color: 'var(--primary)' }}>{result.answered} / {result.total} answered</span>
            </div>
            <div className="bar-bg">
              <div 
                className="bar-fill bar-answered" 
                style={{ width: `${(result.answered / result.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dashboard Footer Navigation */}
        <div className="results-footer">
          <button className="btn btn-secondary" onClick={handleGoDashboard}>
            Back to Dashboard
          </button>
          <button className="btn btn-primary" onClick={handleRetake}>
            Retake Examination
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
