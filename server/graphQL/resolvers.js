const { User, Post } = require('../models'); 
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshh'; 
const expiration = '2h';
const resolvers = {
  Query: {
    // Get all users
    users: async () => {
      return User.find().populate('savedPosts');
    },
    // Get a single user by ID
    user: async (parent, { id }) => {
      return User.findById(id).populate('savedPosts');
    },
    // Get all posts
    posts: async () => {
      return Post.find().populate('author');
    },
    // Get a single post by ID
    post: async (parent, { id }) => {
      return Post.findById(id).populate('author');
    },
  },

  Mutation: {
    // Add a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expiration });
      return { token, user };
    },
    // Log in an existing user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expiration });
      return { token, user };
    },
    // Add a new post (song)
    addPost: async (parent, { movieTitle, songTitle, songLink, explanation, author }) => {
      const post = await Post.create({ movieTitle, songTitle, songLink, explanation, author });
      await User.findByIdAndUpdate(author, { $push: { savedPosts: post._id } });
      return post;
    },
    // Delete a post
    deletePost: async (parent, { id }) => {
      const post = await Post.findByIdAndDelete(id);
      await User.findByIdAndUpdate(post.author, { $pull: { savedPosts: post._id } });
      return post;
    },
  },
};

module.exports = resolvers;