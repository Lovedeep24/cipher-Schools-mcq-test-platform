import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { MediaStreamContext } from './Context/MediaStreamContext';
import styles from './styles/Test.module.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { jwtDecode } from "jwt-decode";


const Test = () => {
  const { stream } = useContext(MediaStreamContext);
  const videoRef = useRef(null);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0); // Default to 0

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:9000/questions');
        setQuestions(response.data);
        setTotalQuestions(response.data.length);
      } catch (err) {
        setError('Failed to fetch questions');
      }
    };

    fetchQuestions();

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

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const assignStreamToVideo = () => {
      if (videoRef.current && stream) {
        console.log('Assigning stream to video element');
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(err => {
            console.error('Error starting video playback:', err);
          });
        };
      } else {
        console.error('videoRef.current or stream is not available', videoRef.current, stream);
        setTimeout(assignStreamToVideo, 100); // Retry after 100ms
      }
    };

    assignStreamToVideo();
  }, [stream]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: optionIndex
    }));
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

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctOption) {
        score += 1;
      }
    });
    return score;
  };
  const getEmailFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);  // Add this line
      return decodedToken.user.email; // Adjust this based on the structure of your JWT payload
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };
  
  const submitTest = async () => {
    const totalQuestions=10;
    const finalScore = calculateScore();
    setScore(finalScore);
    const token = localStorage.getItem('token');
    const email = token ? getEmailFromToken(token) : null;
    console.log('User Email:', email);
    if (!token) {
      alert('You are not logged in. Please log in to submit your test.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/submitTest', {
        email,
        finalScore,
        totalQuestions,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        alert('Test submitted successfully!');
        navigate('/results');
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
    return 'grey';
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
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendIcon} style={{ backgroundColor: 'green' }}></div>
            <span>Answered</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendIcon} style={{ backgroundColor: 'blue' }}></div>
            <span>Current</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendIcon} style={{ backgroundColor: 'orange' }}></div>
            <span>Marked</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendIcon} style={{ backgroundColor: 'gray' }}></div>
            <span>Unanswered</span>
          </div>
        </div>
        <div className={styles.videoContainer}>
          <video ref={videoRef} autoPlay muted style={{ width: '100%', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
};

export default Test;
