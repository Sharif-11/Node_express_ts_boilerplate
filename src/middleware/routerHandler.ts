import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { responseHandler } from "../utils/responseHandler";

// Create a central route handler for undefined routes
export const routeHandler = Router();

// Catch-all middleware for undefined routes
routeHandler.use("*", (req: Request, res: Response) => {
  // Create a detailed error response for undefined routes
  const error = {
    method: req.method,
    path: req.path,
    query: req.query,
    headers: {
      host: req.get("host"),
      origin: req.get("origin"),
      referer: req.get("referer"),
    },
  };

  responseHandler.error(
    res,
    {
      message: `Cannot ${req.method} ${req.path}`,
      stack: JSON.stringify(error),
    },
    StatusCodes.NOT_FOUND
  );
});

// Global error handler for all routes
export const globalErrorHandler = (err: Error, req: Request, res: Response) => {
  // Provide a structured error response
  responseHandler.error(
    res,
    {
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};
