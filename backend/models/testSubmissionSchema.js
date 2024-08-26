const mongoose = require('mongoose');


const testSubmissionSchema = new mongoose.Schema({
  finalScore: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  email: { type: String, required: true },
},{
  timestamps: true  
});


const TestSubmission = mongoose.model('TestSubmission', testSubmissionSchema);



module.exports = TestSubmission;
