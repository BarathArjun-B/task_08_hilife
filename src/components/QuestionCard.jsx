import React from 'react';

function QuestionCard({ question, questionNumber, totalQuestions, selectedOption, onSelectOption }) {
  // Infer category from question database indices
  // IDs 1-5: HTML, 6-10: CSS, 11-15: JavaScript, 16-20: React
  const getCategory = (id) => {
    if (id <= 5) return 'HTML';
    if (id <= 10) return 'CSS';
    if (id <= 15) return 'JavaScript';
    return 'React';
  };

  const options = question.options;

  return (
    <div className="question-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="question-tag">
          {getCategory(question.id)}
        </span>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-light)' }}>
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>
      
      <p className="question-text">{question.question}</p>
      
      <div className="options-list">
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
          
          return (
            <div key={index} className="option-wrapper">
              <label className={`option-label ${isSelected ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={isSelected}
                  onChange={() => onSelectOption(question.id, option)}
                  className="option-radio"
                />
                <span style={{ fontWeight: 700, marginRight: '0.25rem', color: isSelected ? 'var(--primary)' : 'var(--text-light)' }}>
                  {optionLetter}.
                </span>
                <span>{option}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
