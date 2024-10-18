const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./config/connection');
const blogRoutes = require('./routes/api/blog-routes'); 
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphQL/schema.js'); 
const resolvers = require('./graphQL/resolvers.js'); 
const UserModel = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001; 

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    server.applyMiddleware({ app, path: '/graphql' }); 

    app.use('/api/blog', blogRoutes); 

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
        });
    }

    app.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
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

    app.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await UserModel.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '1h' }
            );
            res.json({ token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Server error', error });
        }
    });

    function verifyToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        try {
            const tokenWithoutBearer = token.split(' ')[1];
            const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
            req.user = decoded; 
            next();
        } catch (err) {
            res.status(400).json({ message: 'Invalid token' });
        }
    }

    app.get('/protected', verifyToken, (req, res) => {
        res.json({ message: 'You have access to this protected route', user: req.user });
    });

    db.once('open', () => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🌍 Now listening on http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

startServer();
