require("dotenv").config();

const { JWT_SECRET, MONGO_URL } = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_URL,
};
