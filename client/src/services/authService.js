const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; 


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

export const register = async (username, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
};
export const getToken = () => {
    return localStorage.getItem('token');
};

export const logout = () => {
    localStorage.removeItem('token');
};
