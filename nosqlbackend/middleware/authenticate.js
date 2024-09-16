const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Premium = require("../models/premium");

exports.authenticate = async (req, res, next)=>{
  const headers = req.headers;
  console.log(headers.authorization);
  const jwtData = await jwt.verify(headers.authorization, "mySecretKey");

  const {id} = jwtData;
  const user =await User.findById(id);
  req.user = user;
  next();
}

exports.isPremium = async (req, res, next)=>{

  const isPremiumUser = await Premium.findOne({user : req.user.id});

  req.premium = isPremiumUser == null ? false : true;

  
  next();
}