const mongoose = require('mongoose');

// Define TestSubmission Schema
const testSubmissionSchema = new mongoose.Schema({
  testId: { type: String, required: true },
  answers: { type: Map, of: Number },
  score: { type: Number },
  correctAnswers: { type: Number },
  evaluated: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Create and export TestSubmission model
const TestSubmission = mongoose.model('TestSubmission', testSubmissionSchema);

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true }
});

// Create and export User model
const User = mongoose.model('User', userSchema);

module.exports = { TestSubmission, User };
