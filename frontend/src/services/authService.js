import api from './api'; // Import our pre-configured Axios instance

/**
 * Handles the user login process.
 * @param {string} username - The user's username (PRN for students, email for admins).
 * @param {string} password - The user's plain text password.
 * @returns {Promise<Object>} A promise that resolves to the login response data from the backend.
 * @throws {Error} Throws an error if the login API call fails.
 */
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/auth/login', {
            username: username,
            password: password
        });

        // If the login is successful and an access token is returned...
        if (response.data.accessToken) {
            // ...store the token in the browser's localStorage.
            localStorage.setItem('accessToken', response.data.accessToken);
        }

        return response.data;
    } catch (error) {
        // Log the error and re-throw it so the component can handle it (e.g., show an error message)
        console.error("Login failed:", error);
        throw error;
    }
};

/**
 * Handles the user logout process.
 * This simply removes the stored token from localStorage.
 */
export const logoutUser = () => {
    localStorage.removeItem('accessToken');
    // You can also add logic here to redirect the user to the login page
};
