const catchAsync = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
next()
    };
  };
  
  export default catchAsync;