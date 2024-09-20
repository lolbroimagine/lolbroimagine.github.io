const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can choose any port you like

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Serve index.html from the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Path to the passwords.txt file
    const filePath = path.join(__dirname, 'passwords.txt');

    // Check if the username already exists
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Failed to read file:', err);
            return res.status(500).send('An error occurred while checking for existing usernames.');
        }

        // Check if the username is already in the file
        if (data && data.includes(`Username: ${username}`)) {
            return res.sendFile(path.join(__dirname, 'public', 'error.html'));
        }

        // Append the new username and password to the file
        fs.appendFile(filePath, `Username: ${username}, Password: ${password}\n`, (err) => {
            if (err) {
                console.error('Failed to write to file:', err);
                return res.status(500).send('An error occurred while saving your data.');
            } else {
                // Redirect to success page
                res.redirect('/success');
            }
        });
    });
});

// Serve success.html from the /success route
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
