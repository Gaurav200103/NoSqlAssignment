const mongoose = require("mongoose");

exports.connectDB =async ()=>{
  try {
    await mongoose.connect("mongodb+srv://gpimplekar:gaurav2001@cluster0.kxg9yaw.mongodb.net/expenceTracker")
    console.log('database connected successfully');

  } catch (error) {
    console.log(error);
  }
}
