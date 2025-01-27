import React, { useState } from 'react';
import PollCreationForm from './Components/PollCreationform';
import PollDisplay from './Components/Polldisplay';
import ResultDisplay from './Components/Resultdisplay';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentComponent, setCurrentComponent] = useState('Home');

  const handleLogin = () => {
    if (username === 'Doremon@124' && password === 'Doremon@1244') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password!');
    }
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'Home':
        return (
          <div className="home">
            <h1>Welcome to Votte It</h1>
            <p>Create, participate, and view real-time poll results with ease!</p>
            <div className="features">
              <div className="feature-item">
                <img src="/createpoll.jpg" alt="Create Poll" />
                <h3>Create Polls</h3>
                <p>Easily create custom polls with multiple options.</p>
              </div>
              <div className="feature-item">
                <img src="/displaypoll.jpg" alt="Vote" />
                <h3>Vote</h3>
                <p>Participate in polls and make your voice heard.</p>
              </div>
              <div className="feature-item">
                <img src="/resultpoll.jpg" alt="Results" />
                <h3>View Results</h3>
                <p>See real-time results as votes are counted.</p>
              </div>
            </div>
          </div>
        );
      case 'PollCreation':
        return <PollCreationForm onCreatePoll={handleCreatePoll} />;
      case 'PollDisplay':
        return <PollDisplay polls={polls} onVote={handleVote} />;
      case 'ResultDisplay':
        return <ResultDisplay polls={polls} />;
        case 'AboutUs':
  return (
    <div className="about-us">
      <h2>About Votte It</h2>
      <p>
        <strong>Votte It</strong> is an easy-to-use platform designed to help users create polls,
        participate in voting, and view results in real time. Whether you're making decisions,
        conducting surveys, or gathering opinions, Votte It simplifies the process and enhances engagement.
      </p>

      <div className="features-purpose">
        <h3>Features:</h3>
        <ul>
          <li>Create custom polls with multiple options.</li>
          <li>Participate in voting quickly and easily.</li>
          <li>View real-time poll results instantly.</li>
          <li>Completely secure and user-friendly interface.</li>
        </ul>
        <h3>Purpose:</h3>
        <ul>
          <li>Make group decisions efficiently.</li>
          <li>Conduct market surveys.</li>
          <li>Gather audience feedback.</li>
        </ul>
      </div>

      <div className="creators">
        <div className="creator-box">
          <h3>Made by:</h3>
          <p><strong>Rushikesh Bag</strong></p>
          <div className="social-links">
            <a href="https://www.instagram.com/rushikesh" target="_blank" rel="noopener noreferrer" className="social-btn">Instagram</a>
            <a href="https://github.com/BagHrushi" target="_blank" rel="noopener noreferrer" className="social-btn">GitHub</a>
            <a href="https://www.linkedin.com/in/hrushikesh-bag-662290311?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bu8bQVYkeStGLBjExTScu6w%3D%3D" target="_blank" rel="noopener noreferrer" className="social-btn">LinkedIn</a>
          </div>
        </div>

        <div className="creator-box">
        <h3>Made by:</h3>
          <p><strong>Pooja Rathod</strong></p>
          <div className="social-links">
            <a href="https://www.instagram.com/pooja" target="_blank" rel="noopener noreferrer" className="social-btn">Instagram</a>
            <a href="https://github.com/pooja" target="_blank" rel="noopener noreferrer" className="social-btn">GitHub</a>
            <a href="https://www.linkedin.com/in/pooja" target="_blank" rel="noopener noreferrer" className="social-btn">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );

        
      default:
        return null;
    }
  };

  const [polls, setPolls] = useState([]);

  const handleCreatePoll = (newPoll) => {
    setPolls([...polls, { ...newPoll, votes: Array(newPoll.options.length).fill(0) }]);
  };

  const handleVote = (pollIndex, optionIndex) => {
    const updatedPolls = [...polls];
    updatedPolls[pollIndex].votes[optionIndex] += 1;
    setPolls(updatedPolls);
  };

  if (!isLoggedIn) {
    return (
      <div className="login">
        <h1>Login to Votte It</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">Votte It</header>
      <nav className="app-navbar">
        <button onClick={() => setCurrentComponent('Home')}>Home</button>
        <button onClick={() => setCurrentComponent('PollCreation')}>Poll Creation</button>
        <button onClick={() => setCurrentComponent('PollDisplay')}>Display Poll</button>
        <button onClick={() => setCurrentComponent('ResultDisplay')}>Result</button>
        <button onClick={() => setCurrentComponent('AboutUs')}>About Us</button>
      </nav>
      <main className="app-main">
        {renderComponent()}
      </main>
    </div>
  );
};

export default App;
