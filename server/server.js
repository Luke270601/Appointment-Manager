const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'some secret',
  resave: false,
  cookie: { maxAge: 30000 },
  saveUninitialized: false
}))

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

// POST route to handle user authentication (login)
app.post('/login', (req, res) => {
  const { email, password } = req.body; // Use req.body to access JSON data

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

// POST route to handle user registration
app.post('/register', (req, res) => {
  const { email, password } = req.body; // Use req.body to access JSON data

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check if the user already exists in the array (you can add more validation logic here)
  const userExists = userArray.some((user) => user.email === email);

  if (userExists) {
    return res.status(409).json({ error: "Email already registered." });
  }

  userArray.push({
    email: email,
    password: password
  });

  return res.json({ message: "Account Registered!" });
});

app.get("/api", (req, res) => {
  res.json({ "users": ["userFour", "userTwo", "userThree"] });
})

app.listen(5000, () => { console.log("Server starting on port 5000") });
