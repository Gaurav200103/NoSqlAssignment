
const mongoose = require("mongoose");



const expenceSchema = new mongoose.Schema({

  expence: {
    type:Number,
    required:true
  },
  description: {
    type:String,
    required:true
  },
  category: {
    type:String,
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
},{
  timestamps:true
})

const Expence = mongoose.model("Expence", expenceSchema);
module.exports = Expence;