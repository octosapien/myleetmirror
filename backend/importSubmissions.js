// importSubmissions.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Submission = require('./submissionModel');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Path to your submissions folder
const submissionsDir = path.join(__dirname, '../submissions-main');

// Function to import submissions
const importSubmissions = async () => {
  try {
    const questionDirs = fs.readdirSync(submissionsDir);
    
    for (const questionDir of questionDirs) {
      const acceptedDir = path.join(submissionsDir, questionDir, 'accepted');
      if (fs.existsSync(acceptedDir)) {
        const dateDirs = fs.readdirSync(acceptedDir);
        
        for (const dateDir of dateDirs) {
          const solutionFiles = fs.readdirSync(path.join(acceptedDir, dateDir));
          
          for (const solutionFile of solutionFiles) {
            const filePath = path.join(acceptedDir, dateDir, solutionFile);
            
            // Read the solution file content
            const solutionContent = fs.readFileSync(filePath, 'utf-8');
            
            // Create a submission object
            const submission = new Submission({
              question: questionDir,
              date: dateDir,
              solutionFile: solutionFile,
              solutionContent: solutionContent,
            });
            
            // Save to MongoDB
            await submission.save();
            console.log(`Inserted: ${questionDir} / ${dateDir} / ${solutionFile}`);
          }
        }
      }
    }
    console.log('All submissions have been uploaded.');
  } catch (error) {
    console.error('Error uploading submissions:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the import function
importSubmissions();
