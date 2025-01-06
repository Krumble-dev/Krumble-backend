class ApiError extends Error {
    constructor( statusCode,message) {
      super(message);
  
      this.status = "error";
      this.statusCode = statusCode;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ApiError;