// Reusable error handler   

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor); //This is for debugging purpose
    }
}

module.exports = CustomError;
