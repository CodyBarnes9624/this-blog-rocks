const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
require('dotenv').config();
const secret = 'secret';

const resolvers = {
  Mutation: {
    register: async (_, { username, email, password }) => {
      // Check if user already exists
      const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
      if (existingUser) throw new Error('Username or email already exists');

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(password)
      // Create the new user
      const user = await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

      // Return token and user (exclude password)
      return {
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      };
    },

    login: async (_, { username, password }) => {
      // Find user by username
      const user = await UserModel.findOne({ username });
      console.log(user);
      console.log(password);
      if (!user) throw new Error('Invalid username or password');

      // Check if the password is correct
      const valid = await bcrypt.compare(password, user.password);
      console.log(valid);
      if (!valid) throw new Error('Invalid username or password');

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

      // Return token and user (exclude password)
      return {
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      };
    },
  },
};

module.exports = resolvers;