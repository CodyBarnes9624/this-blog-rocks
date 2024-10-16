const { User } = require('../models'); 

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { id }) => {
      return User.findById(id);
    },
    posts: async () => {
      //  logic to fetch posts
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      //  logic to add a user
    },
    login: async (parent, { username, password }) => {
      //  logic for user login
    },
  },
};

module.exports = resolvers;