// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubmissionList from './SubmissionList';
import SubmissionDetail from './SubmissionDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubmissionList />} />
        <Route path="/submissions/:id" element={<SubmissionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
