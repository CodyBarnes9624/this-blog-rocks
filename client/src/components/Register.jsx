import React from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations'; // Make sure this path is correct
import './Register.css'; // Import the new CSS file

const Register = () => {
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleRegister = async (event) => {
    event.preventDefault();
    const { username, email, password } = event.target.elements;

    try {
      const response = await registerUser({
        variables: {
          username: username.value,
          email: email.value,
          password: password.value,
        },
      });
      console.log("Registration response:", response);
      // Optionally handle success (e.g., redirect or show a message)
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <input name="username" placeholder="Username" required />
      <input name="email" placeholder="Email" required type="email" />
      <input name="password" placeholder="Password" required type="password" />
      <button type="submit">Register</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Register;
