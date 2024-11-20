import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import { routeHandler } from "./middleware/routerHandler";
import { securityMiddleware } from "./middleware/securityMiddleware";
import healthRoutes from "./routes/healthRoutes";
import { logger } from "./utils/logger";

dotenv.config();

class Server {
  private app: Application;
  private port: number;

  constructor() {
    console.clear();
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000", 10);
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json({ limit: "10kb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(requestLogger);
    this.app.use(securityMiddleware);
  }

  private initializeRoutes() {
    this.app.use("/api/v1", healthRoutes);
    this.app.use("*", routeHandler);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  public start() {
    const server = this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received. Shutting down gracefully");
      server.close(() => {
        logger.info("Process terminated");
        process.exit(0);
      });
    });

    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Rejection at:", promise, "reason:", reason);
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (error) => {
      logger.error("Uncaught Exception:", error);
      server.close(() => process.exit(1));
    });
  }
}

const server = new Server();
server.start();
