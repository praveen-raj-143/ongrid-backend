const mongoose = require("mongoose");

mongoose.set("strictQuery",true);

const connection = mongoose.connect("mongodb://127.0.0.1:27017/user")
console.log("connected to database")
module.exports= connection;