import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/Submissions.module.css';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:9000/submissions");
        setSubmissions(response.data);
      } catch (error) {
        setError("Failed to fetch submissions");
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className={styles.container}>
      <Link to="/admin" className={styles.link}>Admin Home</Link>
      <br />
      <Link to="/" className={styles.link}>Home</Link>
      <h1>Submissions</h1>
      {error && <h2 className={styles.error}>{error}</h2>}
      <ul className={styles.submissionlist}>
        {submissions.map((submission, index) => (
          <li key={index} className={styles.submissionitem}>
            <p>Submitted By: {submission.email}</p>
            <p>Score: {submission.finalScore}</p>
            <p>Submission Date: {submission.updatedAt}</p>
            <p>
              Result Out: <span className={submission.status ? '' : 'no'}>{submission.status ? "Yes" : "No"}</span>
            </p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Submissions;
