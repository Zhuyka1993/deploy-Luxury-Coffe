import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Zhuyka:5195454q@cluster0.ebd40.mongodb.net/");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});

export default db;
