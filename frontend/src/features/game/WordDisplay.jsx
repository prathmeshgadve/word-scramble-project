import React from 'react';

const WordDisplay = ({ scrambledWord }) => {
  const letterStyles = {
    display: 'inline-block',
    padding: '10px',
    margin: '5px',
    border: '1_px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#eee',
    fontSize: '1.5rem',
    minWidth: '30px',
    textAlign: 'center',
    textTransform: 'uppercase'
  };

  return (
    <div style={{ padding: '20px' }}>
      {scrambledWord.split('').map((letter, index) => (
        <span key={index} style={letterStyles}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default WordDisplay;