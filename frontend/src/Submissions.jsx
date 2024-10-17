import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:9000/submissions");
        setSubmissions(response.data); // Assuming the response contains the submissions array
      } catch (error) {
        setError("Failed to fetch submissions");
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
            <Link to="/">Home</Link>
      <h1>Submissions</h1>
      {error && <h2>{error}</h2>}
      <ul>
        {submissions.map((submission, index) => (
          <li key={index}>
            
            <p>Submitted By: {submission.email}</p> {/* Modify according to your object structure */}
            <p>Score: {submission.finalScore}</p> {/* Modify according to your object structure */}
            <p>Submission Date: {submission.updatedAt}</p>
            <p>Result Out: {submission.status ? "Yes" : "No"}</p> 
            <hr></hr>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Submissions;
