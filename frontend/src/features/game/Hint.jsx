import React, { useState } from 'react';

const Hint = ({ definition }) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <div style={{ margin: '20px 0' }}>
      <button onClick={() => setShowHint(!showHint)}>
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      {showHint && (
        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
          Hint: {definition}
        </p>
      )}
    </div>
  );
};

export default Hint;