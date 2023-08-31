const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Dummy user data
const userArray = [
  {
    email: "user1@example.com",
    password: "password123"
  },
  {
    email: "user2@example.com",
    password: "securepass456"
  },
  {
    email: "user3@example.com",
    password: "letmein789"
  }
];

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());
app.use(cors());

// GET route to handle user authentication
app.get('/login', (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Loop through userArray to find a matching user
  for (const user of userArray) {
    if (user.email === email && user.password === password) {
      return res.json({ message: "Login successful!" });
    }
  }

  return res.status(401).json({ error: "Invalid email or password." });
});

app.get("/api", (req, res) => {
    res.json({"users": ["userFour", "userTwo", "userThree"]}) 
})

app.listen(5000, () => {console.log("Server starting on port 5000")})