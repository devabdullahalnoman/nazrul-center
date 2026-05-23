import pino from "pino";

// Initialize the internal core Pino engine
const pinoEngine = pino({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === "production" ? "info" : "debug"),
  redact: {
    paths: [
      "req.headers.authorization",
      "password",
      "password_confirmation",
      "shippingDetails.phone",
      "card_no",
      "card_cvv",
    ],
    censor: "[REDACTED_SECURITY_SENSITIVE]",
  },
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Create a custom export map that translates (Message, Context) -> Native Pino (Context, Message)
export const logger = {
  info: (message, context = {}) => {
    pinoEngine.info(context, message);
  },
  warn: (message, context = {}) => {
    pinoEngine.warn(context, message);
  },
  error: (message, error = null, context = {}) => {
    // If an error is supplied, safely map it to standard Pino error serializers
    const combinedPayload = error ? { err: error, ...context } : context;
    pinoEngine.error(combinedPayload, message);
  },
};
