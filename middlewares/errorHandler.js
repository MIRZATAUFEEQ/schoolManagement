/**
 * Centralized Error Handling Middleware
 * This will catch all errors and send a formatted response.
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = err.errors || [];
    let data = err.data || null;

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
        data
    });
};

export default errorHandler;
