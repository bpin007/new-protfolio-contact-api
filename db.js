const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONNECTION_KEY);

console.log(process.env.MONGO_CONNECTION_KEY)

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to MongoDB server 🙂🙂🙂🙂");
});

db.on("error", (err) => {
  console.log("MongoDB Connection Error", err);
});

db.on("disconnected", () => {
  console.log("MongoDB Connection Disconnected");
});

module.exports = db;
