// controllers/submissionsController.js
const Submission = require('./submissionModel');

// Get all submissions
exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching submissions.' });
    }
};

// Get a single submission by ID
exports.getSubmissionById = async (req, res) => {
    console.log("Id");
    try {
        const submission = await Submission.findById(req.params.id);
        console.log(submission)
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found.' });
        }
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching the submission.' });
    }
};

// Add a new submission (for manual testing or admin panel)
exports.createSubmission = async (req, res) => {
    const { question, solutionFile, solutionContent } = req.body;
    try {
        const newSubmission = new Submission({
            question,
            solutionFile,
            solutionContent
        });
        await newSubmission.save();
        res.status(201).json(newSubmission);
    } catch (error) {
        res.status(400).json({ error: 'Error while adding submission.' });
    }
};
