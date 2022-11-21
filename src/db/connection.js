const mongoose = require("mongoose");

const { MONGO_URL } = require("../../config");

const connectMongo = async () => {
  return mongoose.connect(MONGO_URL);
};
module.exports = { connectMongo };
