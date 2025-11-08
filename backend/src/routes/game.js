import express from 'express';
import { protect } from '../middleware/auth.js';
import Word from '../models/Word.js';
import GameSession from '../models/GameSession.js';

const router = express.Router();

// @desc    Submit an answer for a word
// @route   POST /api/game/submit
// @access  Private
router.post('/submit', protect, async (req, res) => {
  const { wordId, userAnswer, timeTaken } = req.body;
  const userId = req.user._id;

  try {
    // Find the correct word in the database
    const word = await Word.findById(wordId);

    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    const isCorrect = word.text === userAnswer.toLowerCase().trim();
    let score = 0;

    if (isCorrect) {
      // Simple scoring: 10 points for correct, add time bonus later
      score = 10; 
      // You can add more complex logic here (e.g., based on timeTaken)
    }

    // Prepare the game round data
    const roundData = {
      wordId,
      userAnswer: userAnswer.toLowerCase().trim(),
      isCorrect,
      timeTaken: timeTaken || 0,
      score: score,
    };

    // Send back the result of the round
    res.json({
      isCorrect,
      correctAnswer: word.text, // Send the correct answer back
      roundData: roundData,     // Send the round data for the frontend to hold
    });

  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});


// @desc    Finish a game session and save it
// @route   POST /api/game/finish
// @access  Private
router.post('/finish', protect, async (req, res) => {
  const { rounds, scoreTotal } = req.body; // Expect an array of roundData objects
  const userId = req.user._id;

  try {
    if (!rounds || rounds.length === 0) {
      return res.status(400).json({ message: 'No rounds played' });
    }

    // Create a new game session to save
    const newSession = new GameSession({
      userId,
      scoreTotal: scoreTotal || 0,
      roundsPlayed: rounds.length,
      rounds: rounds, // Add the array of round sub-documents
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);

  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});


// @desc    Get a user's game history
// @route   GET /api/game/history
// @access  Private
router.get('/history', protect, async (req, res) => {
  const userId = req.user._id;

  try {
    const sessions = await GameSession.find({ userId })
      .sort({ createdAt: -1 }) // Get most recent games first
      .limit(20); // Limit to the last 20 games

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

export default router;