import React, { useState } from 'react'; // Import React and useState hook for managing local component state
import { gql, useMutation } from '@apollo/client'; // Import gql for defining GraphQL queries and useMutation for executing mutations

// Define the GraphQL mutation for registering a new user
const REGISTER_USER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id // The ID of the newly registered user
      username // The username of the newly registered user
    }
  }
`;

// Register component for handling user registration
const Register = () => {
  // State variables for storing username and password input
  const [username, setUsername] = useState(''); // State to manage the username input
  const [password, setPassword] = useState(''); // State to manage the password input
  const [registerUser] = useMutation(REGISTER_USER); // Hook to run the REGISTER_USER mutation

  // Handle the form submission for user registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    await registerUser({ variables: { username, password } }); // Execute the registration mutation with username and password
  };

  return (
    <form onSubmit={handleRegister}> {/* Set the form to call handleRegister on submission */}
      {/* Input field for the username */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
        placeholder="Username" // Placeholder text for the username input
        required // Mark this field as required
      />
      {/* Input field for the password */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
        placeholder="Password" // Placeholder text for the password input
        required // Mark this field as required
      />
      {/* Submit button for the form */}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register; // Export the Register component for use in other parts of the application

