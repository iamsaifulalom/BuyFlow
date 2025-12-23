/**
 * @class AppError
 * @description Custom application error class for consistent error handling.
 * Extends the native Error object with an HTTP status code and a flag for operational errors.
 */
export class AppError extends Error {

  constructor(message, statusCode = 500) {
    super(message);

    this.statusCode = statusCode;
    
    // Preserve correct stack trace (only in development)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}