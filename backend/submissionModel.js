// models/submissionModel.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    question: { type: String },
    solutionFile: { type: String, },
    solutionContent: { type: String, },
    createdAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
