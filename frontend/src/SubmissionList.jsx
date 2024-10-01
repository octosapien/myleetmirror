// src/SubmissionList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SubmissionList() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/submissions')
      .then(response => setSubmissions(response.data))
      .catch(error => console.error('Error fetching submissions:', error));
  }, []);

  return (
    <div>
      <h1>Accepted Submissions </h1>
      <ul>
        {submissions.map((submission) => (
          <li key={submission._id}>
            <Link to={`/submissions/${submission._id}`}>
              {submission.question} - {submission.solutionFile}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubmissionList;
