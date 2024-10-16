const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    posts: [Post]
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    createdAt: String
    author: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): AuthPayload
  }
  
  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;