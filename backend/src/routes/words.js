import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import Word from '../models/Word.js';
import Category from '../models/Category.js';
import { scrambleWord } from '../utils/scramble.js';

const router = express.Router();

// --- GAME ROUTES (PUBLIC/PROTECTED) ---

// @desc    Get a random word for the game
// @route   GET /api/words/random
// @access  Public (or Protected, if you want only logged-in users to play)
// We use 'protect' so only logged-in users can play
router.get('/random', protect, async (req, res) => {
  const { categoryId, difficulty } = req.query; // e.g., ?categoryId=...&difficulty=easy

  try {
    const filter = {};
    if (categoryId) filter.categoryId = categoryId;
    if (difficulty) filter.difficulty = difficulty;

    // Get a count of all words matching the filter
    const count = await Word.countDocuments(filter);
    if (count === 0) {
      return res.status(404).json({ message: 'No words found for this criteria' });
    }

    // Get one random word from the filtered set
    const random = Math.floor(Math.random() * count);
    const word = await Word.findOne(filter).skip(random).populate('categoryId', 'name');
    
    // We only send the scrambled word, definition, and category name
    res.json({
      wordId: word._id,
      scrambled: word.scrambled,
      definition: word.definition,
      category: word.categoryId.name,
      // We DO NOT send word.text (the answer)
    });

  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});


// --- ADMIN ROUTES ---

// @desc    Get all words (for admin list)
// @route   GET /api/words
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    // Populate shows the category name instead of just the ID
    const words = await Word.find({}).populate('categoryId', 'name'); 
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// @desc    Create a new word
// @route   POST /api/words
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  const { text, definition, categoryId, difficulty } = req.body;

  try {
    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    // Auto-generate the scrambled word
    const scrambled = scrambleWord(text.toLowerCase());

    const word = new Word({
      text: text.toLowerCase(),
      scrambled,
      definition,
      categoryId,
      difficulty,
      createdBy: req.user._id,
    });

    const createdWord = await word.save();
    res.status(201).json(createdWord);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// @desc    Delete a word
// @route   DELETE /api/words/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);

    if (word) {
      await word.deleteOne();
      res.json({ message: 'Word removed' });
    } else {
      res.status(404).json({ message: 'Word not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// @desc    Update a word
// @route   PUT /api/words/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  const { text, definition, categoryId, difficulty } = req.body;
  try {
    const word = await Word.findById(req.params.id);

    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    word.text = text ? text.toLowerCase() : word.text;
    word.definition = definition || word.definition;
    word.categoryId = categoryId || word.categoryId;
    word.difficulty = difficulty || word.difficulty;

    // Re-scramble if text has changed
    if (text) {
      word.scrambled = scrambleWord(text.toLowerCase());
    }

    const updatedWord = await word.save();
    res.json(updatedWord);

  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

export default router;