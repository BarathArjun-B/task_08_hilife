import React from 'react';

function QuestionPalette({ questions, currentIndex, answers, onSelectQuestion }) {
  return (
    <div className="palette-card">
      <h3 className="palette-title">Question Navigation</h3>
      
      <div className="palette-grid">
        {questions.map((q, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
          
          let btnClass = 'palette-btn-unanswered';
          if (isCurrent) {
            btnClass = 'palette-btn-current';
          } else if (isAnswered) {
            btnClass = 'palette-btn-answered';
          }

          return (
            <button
              key={q.id}
              className={`palette-btn ${btnClass}`}
              onClick={() => onSelectQuestion(index)}
              title={`Question ${index + 1}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="palette-legend">
        <div className="legend-item">
          <div className="legend-color legend-color-current"></div>
          <span>Current Active Question</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color-answered"></div>
          <span>Answered Question</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color-unanswered"></div>
          <span>Unanswered Question</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionPalette;
