const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to save user data
app.post("/save-user", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("All fields are required.");
    }

    const userData = { name, email, message, timestamp: new Date() };
    const dataFile = "users.json";

    // Save user data to a JSON file
    fs.readFile(dataFile, (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }
        users.push(userData);
        fs.writeFile(dataFile, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving user data.");
            }
            res.status(200).send("User data saved successfully.");
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
