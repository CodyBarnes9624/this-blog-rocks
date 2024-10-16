import { gql } from '@apollo/client';
import { client } from '../apollo'; 

// GraphQL mutation for user login
const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

// GraphQL mutation for user registration
const REGISTER_USER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`;

// Function to log in a user
export const loginUser = async (username, password) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });
    return data.login;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed. Please try again.");
  }
};

// Function to register a new user
export const registerUser = async (username, password) => {
  try {
    const { data } = await client.mutate({
      mutation: REGISTER_USER,
      variables: { username, password },
    });
    return data.register;
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Registration failed. Please try again.");
  }
};