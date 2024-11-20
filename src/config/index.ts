import { logger } from "@/utils/logger";
import dotenv from "dotenv";
import { z } from "zod";

// Environment validation schema
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform(Number).default("3000"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(32).optional(),
});

// Load and parse environment variables
dotenv.config();

// Validate environment configuration
const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  logger.error("Invalid environment configuration:", parseResult.error.errors);
  process.exit(1);
}

export const config = {
  ...parseResult.data,
  isDevelopment: parseResult.data.NODE_ENV === "development",
  isProduction: parseResult.data.NODE_ENV === "production",
};
