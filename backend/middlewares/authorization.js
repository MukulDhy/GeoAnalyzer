const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");


const authorization = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return next(new ErrorHandler("Please login first", 401));
    }
  
    console.log("Token from cookie:", token);
  
    try {
      const data = jsonwebToken.verify(token, process.env.JWT_KEY);
      console.log("Decoded user from token:", data);
  
      if (!data) {
        return next(new ErrorHandler("Invalid Token", 401));
      }
      const user = await User.findById(data.userId);
      req.user = user;
      next();
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Token verification error:", error);
      return next(new ErrorHandler("Invalid Token", 401));
    }
  });

module.exports = authorization;