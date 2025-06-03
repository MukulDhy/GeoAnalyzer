const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const jsonwebToken = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/userSchema");
const { zalgo } = require("colors");

const isAuthorization = catchAsyncError(async (req, res, next) => {
  // const token = req.cookies.token;

  // if (!token) {
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Please login first" });
  // }

  let token = "";
  if (
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) ||
    req.cookies.token
  ) {
    console.log("AuthoRization = " + req.headers.authorization);
    console.log("Cookies = " + req.cookies.token);
    token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : req.cookies.token;
  }
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Please login first" });
  }
  try {
    let decoded;

    if (!req.cookies.token) {
      console.log("Helloooo123123");
      console.log("token = " + token);
      decoded = jsonwebToken.verify(
        req.headers.authorization.split(" ")[1].replace(/^"(.*)"$/, "$1"),
        process.env.JWT_KEY
      );
      console.log(decoded);
    } else {
      decoded = jsonwebToken.verify(req.cookies.token, process.env.JWT_KEY);
      console.log("87342934798khabkkakjdwna");
      console.log(decoded);
    }

    // const decoded = jsonwebToken.verify(
    //   token,
    //   process.env.JWT_KEY
    // );
    // console.log(decoded)

    const user = await User.findById(decoded.userId);

    // if (!user) {
    //   return res.status(401).json({ success: false, message: "Invalid Token" });
    // }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "- SOME ERROR OCCURED -",
      error: error.message,
      errorStack: error.stack,
    });
  }
});

// const isAuthorization = catchAsyncError(async (req, res, next) => {
//   let token = "";
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer") || req.cookies.token
//   ) {

//     console.log("AuthoRization = " + req.headers.authorization);
//     console.log("Cookies = " + req.cookies.token);
//     token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : req.cookies.token;
//   }
//   console.log(token);

//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Please login first" });
//   }

//   try {
//     const decoded = jsonwebToken.verify(
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI2OWVlNTUzM2VhZWQ1NzRmOWEwYmYiLCJpYXQiOjE3MDY0NjcwNDUsImV4cCI6MTcwNzc2MzA0NX0.wZvLmlfo7znZZ2ZgdTjdffUa9GErDlHbZFP48ydn9ac",
//       process.env.JWT_KEY
//     );
//     // const decoded = jsonwebToken.verify(
//     //   token,
//     //   process.env.JWT_KEY
//     // );
//     // console.log(decoded)
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(401).json({ success: false, message: "Invalid Token" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "- SOME ERROR OCCURED -",
//       error: error.message,
//       errorStack: error.stack,
//     });
//   }
// });

// const auth = catchAsyncError(async (req, res, next) => {
//   // const { token } = req.cookies;
//   let token = null;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     console.log("AuthoRization = " + req.headers.authorization);
//     console.log("Cookies = " + req.cookies.token);
//     token = req.headers.authorization.split(" ")[1];
//   }
//   console.log(token);

//   console.log(token);
//   if (!token) {
//     return next(new ErrorHandler("Please login first", 401));
//   }

//   console.log("Token from cookie:", token);

//   try {
//     const decoded_token = jwt.decode(token, process.env.JWT_KEY, algorithms=["HS256"])
//     const data = jsonwebToken.verify(token, process.env.JWT_KEY);
//     // const data = jsonwebToken.verify(token, process.env.JWT_KEY);
//     console.log("Decoded user from token:", decoded_token);
//     console.log("data user from token:", data);

//     if (!data) {
//       return next(new ErrorHandler("Invalid Token", 401));
//     }
//     const user = await User.findById(data.userId);
//     req.user = user;
//     next();
//   } catch (error) {
//     // Log the error for debugging purposes
//     console.error("Token verification error:", error);
//     return next(new ErrorHandler("Invalid Token", 401));
//   }
// });

module.exports = { isAuthorization };
