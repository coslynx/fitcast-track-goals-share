'use strict';

/**
 * Processes user data and token from the API for login.
 * Sanitizes the user data and returns a user object with id, username, and email,
 * and the provided token. Logs errors if input data is not in the expected format.
 *
 * @param {object} userData - User data from the API, expected to have id, username, and email properties.
 * @param {string} token - JWT token string.
 * @returns {object} An object containing the sanitized user data and the token,
 * or a default object with empty user and token if an error occurs.
 */
const login = (userData, token) => {
    try {
        if (!userData || typeof userData !== 'object') {
            console.error('Invalid userData format in login:', userData);
            return { user: {}, token: '' };
        }

        const { id, username, email } = userData;

        if (typeof id !== 'string' || typeof username !== 'string' || typeof email !== 'string') {
             console.error('Invalid data type in userData for login:', userData);
             return { user: {}, token: '' };
        }

        const sanitizedUser = {
            id: id,
            username: username,
            email: email,
        };

        return { user: sanitizedUser, token: token };

    } catch (error) {
        console.error('Error processing login data:', error);
        return { user: {}, token: '' };
    }
};


/**
 * Processes user data and token from the API for registration.
 * Sanitizes the user data and returns a user object with id, username, and email,
 * and the provided token. Logs errors if input data is not in the expected format.
 *
 * @param {object} userData - User data from the API, expected to have id, username, and email properties.
 * @param {string} token - JWT token string.
 * @returns {object} An object containing the sanitized user data and the token,
 * or a default object with empty user and token if an error occurs.
 */
const register = (userData, token) => {
    try {
           if (!userData || typeof userData !== 'object') {
            console.error('Invalid userData format in register:', userData);
            return { user: {}, token: '' };
        }


        const { id, username, email } = userData;


         if (typeof id !== 'string' || typeof username !== 'string' || typeof email !== 'string') {
             console.error('Invalid data type in userData for register:', userData);
             return { user: {}, token: '' };
        }


         const sanitizedUser = {
            id: id,
            username: username,
            email: email,
        };

        return { user: sanitizedUser, token: token };
    } catch (error) {
        console.error('Error processing registration data:', error);
        return { user: {}, token: '' };
    }
};

export { login, register };