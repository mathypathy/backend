const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

const mongoDB_Init = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB is running at ${connection.connection.host}`);
};

module.exports = mongoDB_Init;
