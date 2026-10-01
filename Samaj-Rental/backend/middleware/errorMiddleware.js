const notFound = (
  req,
  res,
  next
) => {
  const error = new Error(
    `Route not found: ${req.method} ${req.originalUrl}`
  );

  res.status(404);

  next(error);
};


/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */

const errorHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(
    "SERVER ERROR:",
    err
  );


  /* ================================================
     DEFAULT STATUS + MESSAGE
  ================================================= */

  let statusCode =
    res.statusCode &&
    res.statusCode !== 200
      ? res.statusCode
      : 500;

  let message =
    err.message ||
    "Something went wrong";


  /* ================================================
     MONGOOSE VALIDATION ERROR
  ================================================= */

  if (
    err.name ===
    "ValidationError"
  ) {
    statusCode = 400;

    const messages =
      Object.values(
        err.errors
      ).map(
        (item) =>
          item.message
      );

    message =
      messages.join(", ");
  }


  /* ================================================
     INVALID MONGODB OBJECT ID
  ================================================= */

  if (
    err.name === "CastError"
  ) {
    statusCode = 400;

    message =
      "Invalid ID format";
  }


  /* ================================================
     DUPLICATE DATA
     MongoDB Error Code: 11000
  ================================================= */

  if (
    err.code === 11000
  ) {
    statusCode = 409;

    const fields =
      Object.keys(
        err.keyValue || {}
      );

    message =
      fields.length > 0
        ? `${fields.join(
            ", "
          )} already exists`
        : "Duplicate data already exists";
  }


  /* ================================================
     FINAL RESPONSE
  ================================================= */

  res
    .status(statusCode)
    .json({
      success: false,
      message,
    });
};


export {
  notFound,
  errorHandler,
};