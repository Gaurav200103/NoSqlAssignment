const mongoose = require("mongoose");



const passwordSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  isActive:{
    type:Boolean,
    required:true
  }
},{
  timestamps:true
})

const Password = mongoose.model("Password", passwordSchema);
module.exports = Password;