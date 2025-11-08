import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <h1>Welcome to Word Scramble!</h1>
      <p>The ultimate brain-teasing word game.</p>
      <div>
        <Link to="/login" style={{ marginRight: '1rem' }}>
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;