const TestSubmission = require('../models/testSubmissionSchema'); // Adjust the path as necessary

const submitTest = async (req, res) => {
  try {
    const { finalScore, totalQuestions, email } = req.body;

if(!finalScore || !totalQuestions || !email)
{
    return res.status(400).json({ message: 'All fields are mandatory' });
}
console.log('Received data:', {finalScore, totalQuestions, email });

    const newSubmission = new TestSubmission({
      finalScore,
      totalQuestions,
      email,
     
    });

    await newSubmission.save();

    
    res.status(201).json({ message: 'Test submitted successfully!' });
    
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'An error occurred while submitting your test. Please try again.' });
  }
};

module.exports = submitTest;