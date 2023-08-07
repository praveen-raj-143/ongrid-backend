const mongoose = require("mongoose");

mongoose.set("strictQuery",true);

const connection = mongoose.connect("mongodb+srv://praveenraj:s9jnBNgCwF81rep9@cluster0.0vpqaam.mongodb.net/?retryWrites=true&w=majority")
console.log("connected to database")
module.exports= connection;