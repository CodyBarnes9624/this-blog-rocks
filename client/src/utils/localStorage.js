// Save data to localStorage
export const saveToLocalStorage = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);  // Convert value to JSON string
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };
  
  // Get data from localStorage
  export const getFromLocalStorage = (key) => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) return null;
      return JSON.parse(serializedValue);  // Parse JSON string back to JS object
    } catch (error) {
      console.error("Error getting data from localStorage:", error);
      return null;
    }
  };
  
  // Remove data from localStorage
  export const removeFromLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data from localStorage:", error);
    }
  };
  
  // Clear all localStorage data
  export const clearLocalStorage = () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };