// utils/API.js


export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error fetching data');
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Example usage in a component:
// const data = await fetchData('posts', { method: 'GET' });