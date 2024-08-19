import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/Test.module.css'; // Assuming you have a CSS module for styling

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600);

  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:9000/questions');
        setQuestions(response.data);
        setTotalQuestions(response.data.length); // Set the total number of questions
      } catch (err) {
        setError('Failed to fetch questions');
      }
    };

    fetchQuestions();

    // Start the timer
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          submitTest();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitTest = async () => {
    let correctAnswersCount = 0;

    // Calculate the number of correct answers
    questions.forEach((question, index) => {
      if (answers[index] === question.correctOptionIndex) {
        correctAnswersCount++;
      }
    });

    const scorePercentage = (correctAnswersCount / totalQuestions) * 100;

    setCorrectAnswers(correctAnswersCount);
    setScore(scorePercentage);

    try {
      const response = await axios.post('http://localhost:9000/submitTest', {
        score: scorePercentage,
        totalQuestions,
        correctAnswers: correctAnswersCount
      }, {
        headers: {
            Authorization: `Bearer ${token}` // Include the token in the request headers
        }
        });

      if (response.status === 201) {
        alert('Test submitted successfully!');
        // Navigate to results or another page
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('An error occurred while submitting your test. Please try again.');
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}h ${minutes}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const getIconColor = (index) => {
    if (index < currentQuestionIndex) return 'green';
    if (index === currentQuestionIndex) return 'blue';
    if (answers[index] !== undefined) return 'orange';
    return 'gray';
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.test}>
      <div className={styles.heading}><p>Online Test</p></div>
      <div className={styles.extraInfo}>
        <div className={styles.time}>
          <h2>Time Remaining</h2>
          <h2 className={styles.timer}>{formatTime(timeRemaining)}</h2>
        </div>

        <div className={styles.questionNav}>
          {questions.map((_, index) => (
            <div
              key={index}
              className={styles.questionIcon}
              style={{ backgroundColor: getIconColor(index) }}
              onClick={() => setCurrentQuestionIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className={styles.questionArea}>
        <h2 className={styles.questionNumber}>Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
        <p>{currentQuestion.questionText}</p>
        <div className={styles.options}>
          {currentQuestion.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={index}
                checked={answers[currentQuestionIndex] === index}
                onChange={() => handleOptionChange(currentQuestionIndex, index)}
              />
              {option}
            </label>
          ))}
        </div>
        <div className={styles.navigation}>
          <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
          <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
          <button onClick={submitTest} className={styles.submitButton}>Submit Test</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
