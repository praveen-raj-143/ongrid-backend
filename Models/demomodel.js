const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    organisation:{
        type:String,
        required:true
    },
    aboutongrid:{
        type:String,
        required:true
    }
}) 

const Demo = mongoose.model("Demo",demoSchema);

module.exports = {Demo};