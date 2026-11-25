const requestBuckets = new Map();

export const securityHeaders = (req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
};

export const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 100 } = {}) => {
  return (req, res, next) => {
    const key = req.ip || req.socket?.remoteAddress || "unknown";
    const now = Date.now();
    const current = requestBuckets.get(key);

    if (!current || now - current.start >= windowMs) {
      requestBuckets.set(key, { start: now, count: 1 });
      return next();
    }

    current.count += 1;

    if (current.count > max) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    return next();
  };
};

export const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const value = req.params[paramName];
    if (!/^[a-fA-F0-9]{24}$/.test(value || "")) {
      return res.status(400).json({ message: `Invalid ${paramName}` });
    }
    next();
  };
};

export const validatePagination = (req, res, next) => {
  const page = Number.parseInt(req.query.page, 10);
  const limit = Number.parseInt(req.query.limit, 10);

  if (req.query.page && (!Number.isInteger(page) || page < 1)) {
    return res.status(400).json({ message: "Page must be a positive integer" });
  }

  if (req.query.limit && (!Number.isInteger(limit) || limit < 1 || limit > 100)) {
    return res.status(400).json({ message: "Limit must be between 1 and 100" });
  }

  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err?.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map((item) => item.message),
    });
  }

  if (err?.code === 11000) {
    return res.status(409).json({ message: "A record with this value already exists" });
  }

  return res.status(err?.statusCode || 500).json({
    message: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err?.message || "Internal server error",
  });
};
