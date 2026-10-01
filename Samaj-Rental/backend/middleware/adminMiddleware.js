const adminMiddleware = (
  req,
  res,
  next
) => {
  /* ================================================
     CHECK AUTHENTICATION
  ================================================= */

  if (!req.user) {
    return res.status(401).json({
      message:
        "Authentication required",
    });
  }


  /* ================================================
     CHECK ADMIN ROLE
  ================================================= */

  if (
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      message:
        "Admin access required",
    });
  }


  /* ================================================
     ALLOW ADMIN
  ================================================= */

  next();
};


export default adminMiddleware;