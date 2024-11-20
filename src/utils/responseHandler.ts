import { Response } from "express";
import { StatusCodes } from "http-status-codes";

interface ErrorResponse {
  message: string;
  stack?: string;
}

interface SuccessResponse<T> {
  data: T;
  message?: string;
}

export const responseHandler = {
  success<T>(
    res: Response,
    data: T,
    message: string = "Success",
    statusCode: number = StatusCodes.OK
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error(
    res: Response,
    error: ErrorResponse,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message: error.message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  },

  pagination<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number
  ): Response {
    return res.status(StatusCodes.OK).json({
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  },
};
