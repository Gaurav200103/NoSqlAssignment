const mongoose = require("mongoose");

const connectDB = async ()=>{
  try {

    await mongoose.connect("mongodb+srv://gpimplekar:gaurav2001@cluster0.kxg9yaw.mongodb.net/sharpner")
    console.log('database connected successfully');
    
  } catch (error) {
    console.log('connection fail', error);
  }
}

module.exports = connectDB;