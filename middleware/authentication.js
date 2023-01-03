const user = require("../models/User");
const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/unauthenticated");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthorized user ---!!!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Unauthorized user!!!");
  }
};
module.exports = auth;
