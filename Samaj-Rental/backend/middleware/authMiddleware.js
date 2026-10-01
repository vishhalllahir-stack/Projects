import jwt from "jsonwebtoken";

const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    /* ================================================
       CHECK AUTHORIZATION HEADER
    ================================================= */

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message:
          "Authentication required",
      });
    }


    /* ================================================
       CHECK BEARER FORMAT
    ================================================= */

    if (
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return res.status(401).json({
        message:
          "Invalid authorization format",
      });
    }


    /* ================================================
       GET TOKEN
    ================================================= */

    const token =
      authHeader
        .split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message:
          "Token missing",
      });
    }


    /* ================================================
       CHECK JWT SECRET
    ================================================= */

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing"
      );

      return res.status(500).json({
        message:
          "JWT secret is not configured",
      });
    }


    /* ================================================
       VERIFY TOKEN
    ================================================= */

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    /* ================================================
       CHECK USER ID
    ================================================= */

    if (!decoded.id) {
      return res.status(401).json({
        message:
          "Invalid token",
      });
    }


    /* ================================================
       SAVE USER DATA
    ================================================= */

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };


    /* ================================================
       NEXT MIDDLEWARE / CONTROLLER
    ================================================= */

    next();

  } catch (error) {
    console.error(
      "Authentication Error:",
      error.message
    );

    return res.status(401).json({
      message:
        "Invalid or expired token",
    });
  }
};

export default authMiddleware;