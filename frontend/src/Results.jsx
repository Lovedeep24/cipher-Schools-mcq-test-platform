import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/results.module.css'; // Import the CSS module

const ResultPage = () => {
  const navigate = useNavigate();

return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Thank You for Taking the Test!</h1>
        <p className={styles.message}>Your test has been successfully submitted.</p>
        <p className={styles.message}>Your test results will be sent to your email address shortly. Please check your inbox (and spam folder) for the results.</p>
        <button className={styles.button} onClick={() => navigate('/')}>Go to Home</button>
      </div>
    </div>
  );
};

export default ResultPage;
