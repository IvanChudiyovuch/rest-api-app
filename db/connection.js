const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://Vanuha:21011986boss@cluster0.apnxikj.mongodb.net/db-contacts?retryWrites=true&w=majority`;

const connectMongo = async () => {
  return mongoose.connect(MONGO_URL);
};
module.exports = { connectMongo };
