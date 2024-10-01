// src/SubmissionDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark ,tomorrow, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function SubmissionDetail() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    console.log("Fetching submission details...");
    axios.get(`http://localhost:5000/api/submissions/${id}`)
      .then(response => setSubmission(response.data))
      .catch(error => console.error('Error fetching submission:', error));
  }, [id]);

  if (!submission) {
    return <div>Loading...</div>;
  }

  console.log(submission)

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{submission.question}</h2>
      <div className="mb-4 text-gray-700">
        {/* <p><strong>Language:</strong> {submission.language}</p>
        <p><strong>Runtime:</strong> {submission.runtime}</p>
        <p><strong>Memory:</strong> {submission.memory}</p> */}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Solution Code:</h3>
        <div className="border-4 border-green-500 rounded-md bg-gray-900 p-8 "
        style={{
          border: '4px solid green',  // Green border
          borderRadius: '8px',        // Rounded corners
          padding: '16px',            // Increased padding
          backgroundColor: '#1e1e1e', // Dark background for code area
        }}
        >
          <SyntaxHighlighter language="cpp" style={vscDarkPlus}>
            {submission.solutionContent}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default SubmissionDetail;
