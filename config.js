require("dotenv").config();

const { JWT_SECRET, MONGO_URL, EMAIL_LOGIN, EMAIL_PASSWORD, EMAIL_SENDER } =
  process.env;

module.exports = {
  JWT_SECRET,
  MONGO_URL,
  EMAIL_LOGIN,
  EMAIL_PASSWORD,
  EMAIL_SENDER,
};
