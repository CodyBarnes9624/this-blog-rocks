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
    movieTitle: String!
    songTitle: String!
    songLink: String!
    explanation: String!
    createdAt: String
    author: User
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    commentText: String!
    createdAt: String
    author: User
    post: Post
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addPost(movieTitle: String!, songTitle: String!, songLink: String!, explanation: String!, author: ID!): Post
    addComment(commentText: String!, author: ID!, post: ID!): Comment
    deletePost(id: ID!): Post
  }
`;

module.exports = typeDefs;