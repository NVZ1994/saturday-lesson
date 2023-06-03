const mongoose = require("mongoose");
// const { DB_HOST } = process.env;

const mongoConnect = async () => {
  await mongoose.connect(process.env.DB_HOST);
};

module.exports = mongoConnect;
