import mongoose from 'mongoose';

// This is a schema for a sub-document, not a full model
const gameRoundSchema = new mongoose.Schema({
  wordId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Word',
  },
  userAnswer: {
    type: String,
    required: true,
    trim: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  timeTaken: {
    type: Number, // Time in seconds
  },
});

export default gameRoundSchema;