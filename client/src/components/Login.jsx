import React, { useState } from 'react'; // Import React and useState hook for managing state
import { gql, useMutation } from '@apollo/client'; // Import gql for GraphQL queries and useMutation for executing mutations
import { setAuthToken } from '../utils/auth'; // Import a utility function to set the authentication token

// Define the GraphQL mutation for logging in a user
const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token // The authentication token returned upon successful login
      user {
        id // The ID of the user
        username // The username of the user
      }
    }
  }
`;

// Login component for handling user login
const Login = () => {
  // State variables for storing username and password input
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [loginUser] = useMutation(LOGIN_USER); // Hook to run the LOGIN_USER mutation

  // Handle the form submission for login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const { data } = await loginUser({ variables: { username, password } }); // Execute the login mutation with username and password
    const { token } = data.login; // Extract the token from the response
    setAuthToken(token); // Set the authentication token for future requests
  };

  return (
    <form onSubmit={handleLogin}> {/* Set the form to call handleLogin on submission */}
      {/* Input field for the username */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update username state on change
        placeholder="Username" // Placeholder for the input field
        required // Make this field required
      />
      {/* Input field for the password */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state on change
        placeholder="Password" // Placeholder for the input field
        required // Make this field required
      />
      {/* Submit button for the form */}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login; // Export the Login component for use in other parts of the application

