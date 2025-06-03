const mongoose = require("mongoose");
const jsonwebToken = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
    },
    name: {
      type: String,
      required: [true, "Please Enter the Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter the Your Email"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please Enter the Your Phone Number"],
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

/* Create Json web Token */
userSchema.methods.gernateJWTtoken = function () {
  return jsonwebToken.sign({ userId: this }, process.env.JWT_KEY);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
