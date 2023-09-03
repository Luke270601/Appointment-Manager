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
    password: "password123",
    role: "Business"
  },
  {
    email: "user2@example.com",
    password: "securepass456",
    role: "User"
  },
  {
    email: "user3@example.com",
    password: "letmein789",
    role: "Admin"
  }
];

// Middleware function to check if a user has a specific role
const hasRole = (role) => {
  return (req, res, next) => {
    const user = req.user; // Assuming you have user data in the request (e.g., from Passport.js)
    
    if (user && user.roles && user.roles.includes(role)) {
      return next(); // User has the required role; continue with the next middleware
    } else {
      return res.status(403).json({ error: "Access denied" }); // User doesn't have the required role
    }
  };
};


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

  // Check if the user already exists in the array 
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

app.listen(5000, () => { console.log("Server starting on port 5000") });
