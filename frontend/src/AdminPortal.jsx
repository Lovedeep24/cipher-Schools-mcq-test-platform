import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function AdminPortal() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div>
            <Link to="/">Home</Link>
      <button onClick={() => navigate('/addquestions')}>Add Question</button>
      <button onClick={() => navigate('/submissions')}>View Submissions</button>
    </div>
  );
}
