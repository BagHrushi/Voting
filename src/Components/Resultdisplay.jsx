import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ polls }) => {
  return (
    <div className="result-display-container">
      <h2>Poll Results</h2>
      {polls.map((poll, pollIndex) => (
        <div key={pollIndex} className="poll-result">
          <h3>{poll.title}</h3>
          {poll.options.map((option, optionIndex) => (
            <div key={optionIndex} className="result-bar">
              <span>{option}</span>
              <span>{poll.votes[optionIndex]} votes</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResultDisplay;
