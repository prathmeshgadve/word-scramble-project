import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const History = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await api.get('/game/history');
        setSessions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load game history');
        setLoading(false);
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p>Loading history...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (sessions.length === 0) return <p>You haven't played any games yet.</p>;

  const sessionCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
    backgroundColor: '#fff',
  };

  const roundListStyle = {
    listStyleType: 'none',
    paddingLeft: '0',
  };

  return (
    <div>
      <h3>Your Game History</h3>
      {sessions.map((session) => (
        <div key={session._id} style={sessionCardStyle}>
          <h4>Game finished on: {new Date(session.createdAt).toLocaleString()}</h4>
          <p><strong>Total Score: {session.scoreTotal}</strong></p>
          <p>Rounds Played: {session.roundsPlayed}</p>
          <details>
            <summary>View Rounds</summary>
            <ul style={roundListStyle}>
              {session.rounds.map((round, index) => (
                <li key={index} style={{ color: round.isCorrect ? 'green' : 'red' }}>
                  Round {index + 1}: Answered "{round.userAnswer}"{' '}
                  ({round.isCorrect ? 'Correct' : 'Wrong'})
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
};

export default History;