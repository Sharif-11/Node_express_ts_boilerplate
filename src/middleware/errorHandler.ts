import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { logger } from "../utils/logger";
import { responseHandler } from "../utils/responseHandler";

export const errorHandler = (err: Error, req: Request, res: Response) => {
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    path: req.path,
  });

  const statusCode =
    res.statusCode === 200 ? StatusCodes.INTERNAL_SERVER_ERROR : res.statusCode;

  responseHandler.error(
    res,
    {
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
    statusCode
  );
};
