
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.log("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "something went very worng!",
      });
    }
  };


  const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  };

const gobalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "production") {
      sendErrorProd(err, res);
    } else if (process.env.NODE_ENV === "development") {
      sendErrorDev(err, res);
    }
  };


export default gobalErrorHandler;