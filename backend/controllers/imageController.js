const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/ApiFeaturs");
const gernateJWTtoken = require("../utils/sendJWTToken");
const Counter = require("../models/counterModel");
const User = require("../models/userSchema");
const ImageUpload = require("../models/imageModel");
const Result = require("../models/resultModel");
const path = require("path")
const fs = require("fs")

/* Get Test Message  */
// const createNewUser = catchAsyncError(async (req, res) => {

//   const counter = await Counter.findOneAndUpdate(
//     {},
//     { $inc: { newUserNumber: 1 } },
//     { upsert: true, new: true }
//   );

//   const newUser = await User.create({
//     userId: counter.newUserNumber,
//     name: req.body.name ? req.body.name : `user ${counter.newUserNumber}`,
//   });
//   await newUser.save();
//   res.status(200).json({
//     success: true,
//     user: newUser,
//     message: "New User Created Succesfully",
//   });
// });

// function convertToBase64(file){
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result)
//       };
//       fileReader.onerror = (error) => {
//         reject(error)
//       }
//     })
// }
// Pending

/* Get Add New Image  */
const addNewImage = catchAsyncError(async (req, res) => {
  const newImage = await ImageUpload.create({
    user: req.user._id,
    originalname: req.file.originalname,
    path: req.file.path,
  });
  await newImage.save();
  res.status(200).json({
    success: true,
    imageId: newImage._id,
    message: "New User Created Succesfully",
  });
});

const getResultImage = catchAsyncError(async (req, res) => {
  const imageId = req.params._id;
  console.log(imageId);
  const image = await ImageUpload.findById(imageId)
  .populate(
    "result",
    "resultImagePath"
  );
  // console.log(image);
  
  // const imagePath = path.join(__dirname,image.result.resultImagePath)
  const imagePath = path.join(__dirname,`../../${image.result.resultImagePath}`)
  // console.log(image.result)
  // console.log(imagePath);
  const stream = fs.createReadStream(imagePath)
  stream.pipe(res);
  // res.status(200).json({
  //   success: true,
  //   data: "ddd",
  //   image
  // });
});

module.exports = {
  addNewImage,
  getResultImage,
};
