const User = require("../models/User");
const { StatusCodes, BAD_REQUEST } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
var bcrypt = require("bcryptjs");
const { UnauthenticatedError } = require("../errors");

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  console.log(user, "SDDDDDDD");

  const token = user.createJWT();
  console.log(user, token);

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    throw new BadRequestError("Please enter all fields");
  }
  const user = await User.findOne({ email });
 
  if (!user) {
    throw new UnauthenticatedError("User does not exist!");
  }
  const isPasswordMatch=await user.comparePassword(password)

  if(!isPasswordMatch){
    throw new UnauthenticatedError("Unauthorized user!!!!")
  }
  const token = user.createJWT();
  res.status(200).json({user:{name:user.name},token});
};

module.exports = { registerUser, loginUser };
