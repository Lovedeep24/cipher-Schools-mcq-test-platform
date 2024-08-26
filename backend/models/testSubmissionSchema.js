const mongoose = require('mongoose');

// Define TestSubmission Schema
const testSubmissionSchema = new mongoose.Schema({
  finalScore: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  email: { type: String, required: true },
},{
  timestamps: true  
});

// Create and export TestSubmission model
const TestSubmission = mongoose.model('TestSubmission', testSubmissionSchema);



module.exports = TestSubmission;
