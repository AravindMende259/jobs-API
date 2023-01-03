const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || "Something wrong...",
  };
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.code && err.code === 11000) {
   
    customError.msg = `Duplicate value entered ${Object.keys(err.keyValue)}`;
customError.statusCode=400

    // return res.status(StatusCodes.BAD_REQUEST).json({ msg: customError.msg });
  }

  console.log("sdddddddddd",err.errors);

  if(err.name==="ValidationError"){
    customError.msg=Object.values(err.errors).map((item)=>item.message).join(',')
   customError.statusCode=400
  }
 
  // return res.status(customError.statusCode).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
