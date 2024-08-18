import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles/Dashboard.module.css"; // Assuming you have a CSS module for styling

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1>Welcome to the MCQ Test Platform</h1>
      <p>This platform allows students to take multiple-choice question tests, manage their profiles, and view their results.</p>
      
      <div className={styles.authLinks}>
        <Link to="/login" className={styles.loginLink}>Login</Link>
        <Link to="/signup" className={styles.signupLink}>Signup</Link>
      </div>
    </div>
  );
};

export default Dashboard;