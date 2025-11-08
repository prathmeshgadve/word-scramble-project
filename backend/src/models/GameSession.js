import mongoose from 'mongoose';
import gameRoundSchema from './GameRound.js'; // Import the sub-schema

const gameSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    scoreTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    roundsPlayed: {
      type: Number,
      required: true,
      default: 0,
    },
    // Embed the array of rounds using the schema
    rounds: [gameRoundSchema],
  },
  {
    timestamps: true,
  }
);

const GameSession = mongoose.model('GameSession', gameSessionSchema);
export default GameSession;