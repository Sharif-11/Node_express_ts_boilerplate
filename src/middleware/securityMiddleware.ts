import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

export const securityMiddleware = [
  // Rate Limiting
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests, please try again later.",
  }),

  // Additional security middleware
  (req: Request, res: Response, next: NextFunction) => {
    // Remove potentially sensitive headers
    res.removeHeader("X-Powered-By");

    // Basic XSS protection
    res.setHeader("X-XSS-Protection", "1; mode=block");

    // Prevent MIME type sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");

    // Referrer Policy
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    // Content Security Policy (basic example)
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    );

    next();
  },
];
