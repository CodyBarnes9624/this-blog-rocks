// src/services/authService.js



export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token); 
        return data;
    } else {
        throw new Error(data.message);
    }
};