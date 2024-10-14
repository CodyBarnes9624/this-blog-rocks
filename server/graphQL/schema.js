const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    playlistUrl: String!
    author: User!
    createdAt: String!
  }

  type Vote {
    id: ID!
    user: User!
    blog: Blog!
  }

  type Query {
    getUsers: [User]
    getBlogs: [Blog]
    getBlog(id: ID!): Blog
  }

  type Mutation {
    addBlog(title: String!, content: String!, playlistUrl: String!): Blog
    deleteBlog(id: ID!): Blog
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload
    voteOnBlog(blogId: ID!): Vote
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;