
// Function to set the token in local storage
export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('jwt_token', token); // Save the token in local storage
    } else {
      localStorage.removeItem('jwt_token'); // Remove the token if not provided
    }
  };
  
