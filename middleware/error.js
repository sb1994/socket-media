const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (statusCode !== 200) {
    console.log(err.message);
    res
      .json({
        message: err.message,
      })
      .status(statusCode);
  }
};

module.exports = { notFound, errorHandler };
