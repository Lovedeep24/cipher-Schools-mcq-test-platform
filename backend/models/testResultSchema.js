// models/testResultSchema.js
const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const TestResult = mongoose.model('TestResult', testResultSchema);
module.exports = TestResult;
