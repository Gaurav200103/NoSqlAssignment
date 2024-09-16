const mongoose = require("mongoose");


const premiumSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
},{
  timestamps:true
})

const Premium = mongoose.model("Premium", premiumSchema);
module.exports = Premium;