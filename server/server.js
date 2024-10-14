const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./config/connection'); // Connect to your MongoDB database
const routes = require('./routes'); // Import the routes from 'routes' folder

const app = express();
const PORT = process.env.PORT || 3009; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Enable CORS

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123'; // Replace with your actual secret key

// Use the imported routes
app.use('/api', routes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Protected route example (requires JWT token)
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'You have access to this protected route', user: req.user });
});

// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

// Start the server after database connection
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});