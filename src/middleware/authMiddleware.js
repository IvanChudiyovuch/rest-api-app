const jwt = require("jsonwebtoken");
const { User } = require("../models/usersModel");
const { JWT_SECRET } = require("../../config");

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    next(res.status(401).json({ message: "Not authorized" }));
  }

  try {
    const userToken = jwt.decode(token, JWT_SECRET);
    const user = await User.findById(userToken.id);

    if (token !== user.token) {
      next(res.status(401).json({ message: "Not authorized" }));
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { authMiddleware };
