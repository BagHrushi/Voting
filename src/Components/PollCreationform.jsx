import React, { useState } from 'react';
import './PollCreationForm.css';

const PollCreationForm = ({ onCreatePoll }) => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePoll({ title, options });
    setTitle('');
    setOptions(['', '']);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="poll-creation-container">
      <form className="poll-creation-form" onSubmit={handleSubmit}>
        <h2>Create a New Poll</h2>
        <input
          type="text"
          placeholder="Poll Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={handleAddOption}>Add Option</button>
        <button type="submit">Create Poll</button>
      </form>
      {showPopup && <div className="popup">Poll created successfully!</div>}
    </div>
  );
};

export default PollCreationForm;