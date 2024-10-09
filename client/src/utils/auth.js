// Function to set the JWT token in local storage
export const setAuthToken = token => {
    if (token) {
      // If a token is provided, save it in local storage with the key 'jwtToken'
      localStorage.setItem('jwtToken', token);
    } else {
      // If no token is provided, remove the token from local storage
      localStorage.removeItem('jwtToken');
    }
  };
  
  // Function to check if the user is authenticated
  export const isAuthenticated = () => {
    // Return true if the 'jwtToken' exists in local storage, otherwise return false
    return !!localStorage.getItem('jwtToken');
  };
  
  // Function to retrieve the JWT token from local storage
  export const getAuthToken = () => {
    // Return the value of 'jwtToken' from local storage
    return localStorage.getItem('jwtToken');
  };
  
