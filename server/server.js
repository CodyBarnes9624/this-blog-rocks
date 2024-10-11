const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 


const JWT_SECRET = 'supersecretkey123';


const users = [];


app.use(routes);
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Register Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.json({ message: 'User registered successfully!' });
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Create JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to verify JWT token
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

// Protected Route (example)
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'You have access to this protected route', user: req.user });
});

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
