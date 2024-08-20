const cron = require('node-cron');
const { TestSubmission, User } = require('./models/testSubmissionSchema'); // Adjust the path if neede
const Question = require('./models/questionsSchema'); // Adjust the path

const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to evaluate tests
const evaluateTests = async () => {
    try {
      console.log('Running cron job to evaluate submitted tests');
  
      // Fetch all submitted tests that need evaluation
      const submissions = await TestSubmission.find({ evaluated: false });
  
      for (const submission of submissions) {
        const { testId, answers, userId } = submission;
  
        // Fetch questions from the database
        const questions = await Question.find({ testId });
  
        if (!questions || questions.length === 0) {
          console.error(`Questions not found for testId: ${testId}`);
          continue;
        }
  
        // Calculate correct answers count
        let correctAnswersCount = 0;
  
        questions.forEach((question, index) => {
          if (answers.get(index) === question.correctOptionIndex) {
            correctAnswersCount++;
          }
        });
  
        const scorePercentage = (correctAnswersCount / questions.length) * 100;
  
        // Update the submission with the score
        submission.correctAnswers = correctAnswersCount;
        submission.score = scorePercentage;
        submission.evaluated = true;
        await submission.save();
  
        // Fetch user details to get email
        const user = await User.findById(userId);
        if (!user) {
          console.error(`User not found for userId: ${userId}`);
          continue;
        }
  
        // Send the score to the user's email
        const mailOptions = {
          from: process.env.EMAIL_USER, // Ensure this is set correctly
          to: user.email,
          subject: 'Your Test Score',
          text: `Your test score is ${scorePercentage}%. You answered ${correctAnswersCount} out of ${questions.length} questions correctly.`
        };
  
        try {
          await transporter.sendMail(mailOptions);
          console.log(`Score sent to ${user.email}`);
        } catch (mailError) {
          console.error('Error sending email:', mailError);
        }
      }
    } catch (error) {
      console.error('Error evaluating submitted tests:', error);
    }
  };
  

// Schedule the cron job to run every hour
cron.schedule('* * * * *', evaluateTests);

module.exports = evaluateTests;
