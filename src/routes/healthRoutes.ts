import express from "express";
import { StatusCodes } from "http-status-codes";
import { responseHandler } from "../utils/responseHandler";

const router = express.Router();

router.get("/health", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  responseHandler.success(
    res,
    healthcheck,
    "Server is healthy",
    StatusCodes.OK
  );
});

router.get("/version", (req, res) => {
  responseHandler.success(
    res,
    { version: process.env.npm_package_version || "1.0.0" },
    "Application version"
  );
});

export default router;
