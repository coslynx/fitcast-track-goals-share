/**
 * Formats a date string into 'YYYY-MM-DD' format.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string or 'Invalid Date' if the input is invalid.
 */
const formatDate = (dateString) => {
    if (!dateString) {
        return 'Invalid Date';
    }

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return utcDate.toISOString().slice(0, 10);
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
};


/**
 * Validates if an email string is in a valid format.
 *
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
    if (typeof email !== 'string') {
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};


/**
 * Extracts form data from a form element into an object.
 * Handles different input types, including files and empty values.
 * @param {HTMLFormElement} formElement - The form element to extract data from.
 * @returns {object} An object containing the form data or an empty object if the form is invalid.
 */
const extractFormData = (formElement) => {
    if (!formElement || !(formElement instanceof HTMLFormElement)) {
        console.error('Invalid form element provided to extractFormData.');
        return {};
    }

    try {
        const formData = new FormData(formElement);
        const data = {};
        for (const [key, value] of formData.entries()) {
           if (value instanceof File) {
                 data[key] = value;
            } else {
                data[key] = value === '' ? '' : String(value);
            }
        }
        return data;
    } catch (error) {
       console.error('Error extracting form data:', error);
        return {};
    }
};


/**
 * Truncates a string if it exceeds the specified maximum length.
 *
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {string} The truncated string with an ellipsis or the original string.
 */
const truncateString = (str, maxLength) => {
    if (!str) {
        return '';
    }

    if (typeof str !== 'string') {
      console.error('Input string must be a valid string')
      return '';
    }


    if (typeof maxLength !== 'number' || maxLength <= 0) {
      console.error('maxLength must be a valid positive number')
        return str;
    }


    if (str.length <= maxLength) {
        return str;
    }


    return str.slice(0, maxLength) + '...';
};



/**
 * Sanitizes an input string to prevent XSS attacks.
 *
 * @param {string} inputString - The string to sanitize.
 * @returns {string} The sanitized string.
 */
const sanitizeInput = (inputString) => {
    if (!inputString) {
        return '';
    }
    if (typeof inputString !== 'string')
    {
      console.error('Input must be a string')
      return '';
    }

    return String(inputString).replace(/[<>&"'`]/g, (char) => {
      switch (char) {
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '&':
          return '&amp;';
        case '"':
          return '&quot;';
         case '\'':
            return '&#x27;';
        case '`':
            return '&#x60;';
        default:
          return char;
      }
  });
};

export { formatDate, validateEmail, extractFormData, truncateString, sanitizeInput };