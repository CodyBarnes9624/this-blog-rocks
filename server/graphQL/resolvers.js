const { User, Blog, Vote } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'yourSecretKey';  // Store this securely

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getBlogs: async () => {
      return await Blog.find().populate('author');
    },
    getBlog: async (parent, { id }) => {
      return await Blog.findById(id).populate('author');
    }
  },
  Mutation: {
    register: async (parent, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      const token = jwt.sign({ userId: user.id }, secret);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('No user found');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');
      const token = jwt.sign({ userId: user.id }, secret);
      return { token, user };
    },
    addBlog: async (parent, { title, content, playlistUrl }, context) => {
      if (!context.user) throw new Error('You must be logged in to create a blog');
      const blog = await Blog.create({ title, content, playlistUrl, author: context.user.id });
      return blog;
    },
    deleteBlog: async (parent, { id }, context) => {
      if (!context.user) throw new Error('You must be logged in to delete a blog');
      const blog = await Blog.findById(id);
      if (blog.author.toString() !== context.user.id) throw new Error('Not authorized');
      await Blog.findByIdAndDelete(id);
      return blog;
    },
    voteOnBlog: async (parent, { blogId }, context) => {
      if (!context.user) throw new Error('You must be logged in to vote');
      const vote = await Vote.create({ user: context.user.id, blog: blogId });
      return vote;
    }
  }
};

module.exports = resolvers;