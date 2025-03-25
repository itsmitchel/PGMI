const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors"); // Import the CORS middleware

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Ensure the users.json file exists
const dataFile = "users.json";
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, "[]");
}

// Endpoint to save user data (registration)
app.post("/save-user", (req, res) => {
    const { name, email, password, message } = req.body;

    if (!name || !email || !password || !message) {
        return res.status(400).send("All fields are required.");
    }

    const userData = { name, email, password, message, timestamp: new Date() };

    fs.readFile(dataFile, (err, data) => {
        let users = [];
        if (!err) {
            try {
                users = JSON.parse(data);
            } catch (parseError) {
                return res.status(500).send("Error reading user data.");
            }
        }

        // Check if the email already exists
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            return res.status(400).send("User with this email already exists.");
        }

        users.push(userData);
        fs.writeFile(dataFile, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving user data.");
            }
            res.status(200).send("User registered successfully.");
        });
    });
});

// Endpoint to verify login credentials
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return res.status(500).send("Error reading user data.");
        }

        let users = [];
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).send("Error reading user data.");
        }

        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            return res.status(401).send("Invalid email or password.");
        }

        res.status(200).send("Login successful.");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
