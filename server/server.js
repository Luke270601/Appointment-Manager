const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();
const connectToDatabase = require('./db.js'); // Import the MongoDB connection


app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(session({
  secret: 'some secret',
  key: 'userId',
  resave: false,
  cookie: { maxAge: 60 * 60 * 24 * 1000 },
  saveUninitialized: false
}));

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

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Find the user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Set the user data in the session
    req.session.user = user;

    return res.json({ message: "Login successful!" });
  } catch (err) {
    console.error('Error logging in user:', err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.get('/logout', async (req, res) => {
  try {
    req.session.user = null;
    return res.json({ message: "Logout successful!" });
  } catch (err) {
    console.error('Error logging out user:', err);
    return res.status(500).json({ error: "Internal server error." });
  }
});


app.get('/login', (req, res) => {
  if(req.session.user){
    res.send({loggedIn: true})
  }
  else{
    res.send({loggedIn: false})
  }
})

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Check if the user already exists
    const userExists = await usersCollection.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: "Email already registered." });
    }

    // Hash the password before storing it in the database
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the MongoDB collection with the hashed password
    await usersCollection.insertOne({
      email,
      password: hashedPassword, // Store the hashed password
      role: 'User'
    });

    return res.json({ message: "Account Registered!" });
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(5000, () => { console.log("Server starting on port 5000") });
