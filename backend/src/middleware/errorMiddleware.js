function notFoundHandler(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  if (error.code === 11000) {
    res.status(409).json({
      message: "Duplicate record already exists."
    });
    return;
  }

  res.status(statusCode).json({
    message: error.message || "Server error"
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
