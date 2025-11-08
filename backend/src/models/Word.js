import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    scrambled: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    definition: {
      type: String,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// We'll add a helper function in our routes to create the 'scrambled' version,
// so we just need to store it here.

const Word = mongoose.model('Word', wordSchema);
export default Word;