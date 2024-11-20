import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  // Log the original method to capture the request details
  const logRequest = (): void => {
    const duration = Date.now() - start;

    logger.info("Request Processed", {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });
  };

  // Attach log function to response finish event
  res.on("finish", logRequest);

  next();
};
