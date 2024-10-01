// routes/submissionsRoutes.js
const express = require('express');
const { getAllSubmissions, getSubmissionById, createSubmission } = require('./submissionsController');

const router = express.Router();

router.get('/', getAllSubmissions);
router.get('/:id', getSubmissionById);
router.post('/', createSubmission);  // For adding new submissions via POST requests

module.exports = router;
