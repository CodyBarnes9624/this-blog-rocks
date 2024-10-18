const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./config/connection');
const blogRoutes = require('./routes/api/blog-routes'); // Import blog routes
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphQL/schema.js'); 
const resolvers = require('./graphQL/resolvers.js'); 
const UserModel = require('./models/User'); // Import your User model
const routes=require("./routes")
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;


// Create a new Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  // Start the Apollo Server
  await server.start();

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  // Apply the Apollo GraphQL middleware to your Express server
  server.applyMiddleware({ app, path: '/graphql' }); 

  app.use("/",routes)
  // Blog routes setup
  app.use('/api/blog', blogRoutes); // Use the blog routes

  // If we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Serve React frontend
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
  }

  // Register Route
  app.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store user in your database
      const user = await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });

      res.json({ message: 'User registered successfully!', user });
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.code === 11000) {
        res.status(400).json({ message: 'Username or email already exists' });
      } else {
        res.status(500).json({ message: 'Server error', error });
      }
    }
  });

  // Login Route
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find user in the database
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        'secret',
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

  // Middleware to verify JWT token
  function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
      // Extract token after "Bearer"
      const tokenWithoutBearer = token.split(' ')[1];
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
      req.user = decoded; 
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token' });
    }
  }

  // Protected Route
  app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You have access to this protected route', user: req.user });
  });

  // Start the database connection and the Express server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startServer(); // Call the async function to start the server