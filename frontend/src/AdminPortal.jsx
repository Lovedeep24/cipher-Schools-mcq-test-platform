import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './styles/AdminPortal.module.css'// Import the CSS file

export default function AdminPortal() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className={styles.container}>
          <Link to="/admin" className={styles.link}>Admin Home</Link>
          <br></br>
          <Link to="/" className={styles.link}>Home</Link>
      <h1>Admin Portal</h1>
      <div className={styles.btnContainer}>
      <button className={styles.button} onClick={() => navigate('/addquestions')}>Add Question</button>
      <button className={styles.button} onClick={() => navigate('/submissions')}>View Submissions</button>
      </div>
    </div>
  );
}
