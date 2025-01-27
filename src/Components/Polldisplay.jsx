import React from 'react';
import './PollDisplay.css';

const PollDisplay = ({ polls, onVote }) => {
  return (
    <div className="poll-display-container">
      <h2>Available Polls</h2>
      {polls.map((poll, pollIndex) => (
        <div key={pollIndex} className="poll">
          <h3>{poll.title}</h3>
          {poll.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => onVote(pollIndex, optionIndex)}
            >
              {option}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PollDisplay;