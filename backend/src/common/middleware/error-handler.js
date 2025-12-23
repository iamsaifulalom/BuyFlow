import { AppError } from "../utils/app-error.js";

export function errorHandler(err,req , res,_next) {
  // If it's an AppError, use its status & message
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // For unexpected errors
  console.error("UNHANDLED ERROR →", err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}