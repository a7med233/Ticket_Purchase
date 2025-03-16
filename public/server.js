// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body;

    // Save form data to a file (you could use a database here instead)
    const dataFilePath = path.join(__dirname, 'submissions.json');

    // Read the current data file if it exists
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        let submissions = [];
        if (!err && data) {
            submissions = JSON.parse(data);
        }

        // Add the new form data
        submissions.push(formData);

        // Save the updated data to the file
        fs.writeFile(dataFilePath, JSON.stringify(submissions, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving data' });
            }
            res.status(200).json({ message: 'Form submitted successfully!' });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
