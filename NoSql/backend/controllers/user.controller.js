const User = require("../models/user.model");
const bcrypt = require("bcrypt");


exports.addUser = async (req,res)=>{
  try {

    const {name, email, password} = req.body;

    const newPassword = await bcrypt.hash(password, 10);

    await User.create({name, email, password: newPassword});
    
    res.json({
      message:"user creaeted successfully"
    })
  } catch (error) {
    console.log(error);
  }
}

exports.findUserById = async (req, res)=>{
  try {
    const {id} = req.params;

    const user = await User.findById(id);

    res.json({user});
  } catch (error) {
    console.log(error);
  }
}