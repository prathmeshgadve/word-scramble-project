import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import WordDisplay from './WordDisplay';
import Hint from './Hint';

const GameSolo = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Game settings
  const categoryId = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');

  // Game State
  const [wordData, setWordData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState(''); // 'Correct!', 'Wrong!'

  // Session State
  const [rounds, setRounds] = useState([]);
  const [score, setScore] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const totalRounds = 5; // Let's set a 5-round game

  // 1. Fetch a new word from the backend
  const fetchWord = async () => {
    setLoading(true);
    setError('');
    setFeedback('');
    setUserAnswer('');
    try {
      const response = await api.get(
        `/words/random?categoryId=${categoryId}&difficulty=${difficulty}`
      );
      setWordData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch a new word. Game over.');
      console.error(err);
      setLoading(false);
    }
  };

  // 2. Fetch the first word when the game starts
  useEffect(() => {
    if (!categoryId || !difficulty) {
      navigate('/dashboard'); // Redirect if settings are missing
    } else {
      fetchWord();
    }
  }, []); // Run only once on mount

  // 3. Handle the submission of an answer
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/game/submit', {
        wordId: wordData.wordId,
        userAnswer: userAnswer,
      });

      const { isCorrect, correctAnswer, roundData } = response.data;
      
      // Add the completed round to our session state
      setRounds([...rounds, roundData]);
      setRoundsPlayed(roundsPlayed + 1);

      if (isCorrect) {
        setScore(score + roundData.score);
        setFeedback('Correct!');
      } else {
        setFeedback(`Wrong! The correct answer was: ${correctAnswer}`);
      }
      
      // Wait 2 seconds, then check if game is over or fetch next word
      setTimeout(() => {
        if (roundsPlayed + 1 >= totalRounds) {
          finishGame();
        } else {
          fetchWord(); // Get the next word
        }
      }, 2000);

    } catch (err) {
      setError('Error submitting answer.');
      console.error(err);
      setLoading(false);
    }
  };

  // 4. Finish the game and save the session
  const finishGame = async () => {
    setLoading(true);
    setFeedback('Game Over! Saving your score...');
    try {
      await api.post('/game/finish', {
        rounds: rounds,
        scoreTotal: score,
      });
      // Game saved, redirect to profile/history
      navigate('/profile');
    } catch (err) {
      setError('Failed to save your game session.');
      console.error(err);
      setLoading(false);
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Game On!</h2>
      <p>Score: {score}</p>
      <p>Round: {roundsPlayed + 1} / {totalRounds}</p>
      
      {loading && !feedback ? (
        <p>Loading new word...</p>
      ) : (
        <>
          {feedback && <h3 style={{color: feedback === 'Correct!' ? 'green' : 'red'}}>{feedback}</h3>}
          
          <WordDisplay scrambledWord={wordData?.scrambled || '...'} />
          <Hint definition={wordData?.definition || '...'} />
          
          <form onSubmit={handleSubmitAnswer}>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              disabled={loading || !!feedback} // Disable input while loading or showing feedback
              autoFocus
            />
            <button type="submit" disabled={loading || !!feedback}>
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default GameSolo;