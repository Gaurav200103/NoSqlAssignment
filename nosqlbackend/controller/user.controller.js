const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Premium = require("../models/premium");
const nodemailer = require("nodemailer");
const Password = require("../models/password");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

exports.addUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const newPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        message: "User already exists",
        signup: false
      })
    }

    await User.create({ name, email, password: newPassword });


    res.json({
      message: "User singup successfully",
      signup: true
    })
  } catch (error) {

    console.log(error);
  }
}


exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        login: false
      })
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      const token = await jwt.sign({ id: user._id }, "mySecretKey");

      const isPremiumUser = await Premium.findOne({ _id: user._id });


      return res.status(200).json({
        message: "User logged in successfully",
        login: true,
        token,
        isPremiumUser: isPremiumUser == null ? false : true
      })
    }

    res.status(401).json({
      message: "User not authorized",
      login: false
    })

  } catch (error) {
    console.log(error);
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });


    if (user) {
      let password = await Password.create({ user: user._id, isActive: true });


      let testAccount = nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'casandra.mraz52@ethereal.email',
          pass: 'YwePgMRCG3eaqv1Tza'
        }
      });


      const info = await transporter.sendMail({
        from: '"gaurav pimplekar" <gpimplekar@gmail.email>', // sender address
        to: email, // list of receivers
        subject: "forgot password", // Subject line
        text: `this is user password recovery link http://localhost:3000/resetPassword/${password._id}`, // plain text body

      })

      res.send();

    }
    else {
      res.send("account not found")
    }
  } catch (error) {
    console.log(error);
  }
}


exports.resetPassword = async (req, res) => {
  try {

    const { uid } = req.params;
    // console.log(uid);
    const active = await Password.findById(uid);
    console.log(active);
    const user = await User.findById(active.user._id);


    if (active.isActive == true) {

      res.redirect("http://localhost:3000/resetpassword.html");
    }

    res.json({ user });

  } catch (error) {
    console.log(error);
  }
}


exports.updatePassword = async (req, res) => {
  try {

    const { password, email } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 10);
    console.log(password, email);

    await User.updateOne({email}, {password:cryptedPassword});

    res.send("password updated successfully");

  } catch (error) {

  }
}