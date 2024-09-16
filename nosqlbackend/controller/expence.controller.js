const { isPremium } = require("../middleware/authenticate");
const Expence = require("../models/expence");
const User = require("../models/user");
const sequelize = require("../utils/database");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
// const AWS = require("aws-sdk");
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const Url = require("../models/urls");

exports.addExpence = async (req, res) => {
  try {

    const { expence, description, category } = req.body;

    await Expence.create({ expence, description, category, user: req.user.id });

    await User.findByIdAndUpdate(req.user._id,{ totalExpence: req.user.totalExpence + Number(expence) });

    

    res.json("expence added successfully");

  } catch (error) {
    console.log(error);
  }
}

exports.getExpences = async (req, res) => {
  try {
    const query = { page: req.query.page, rows: Number(req.query.rows) }
    const expences = await Expence.find({user: req.user._id});
    const totalPage = expences.length;
    const pages = Math.ceil(totalPage / query.rows);
    let start = 0;
    let end = 0;

    if (query.page > 0 && query.page < pages) {
      start = (query.page - 1) * query.rows;
      end = Number(query.page) * query.rows;
    }
    else if (query.page == pages) {
      start = (query.page - 1) * query.rows;
      end = expences.length;
    }

    const pageData = [];

    for (let i = start; i < end; i++) {
      pageData.push(expences[i]);
    }
    
    
    res.json({
      expences: pageData,
      isPremiumUser: req.premium,
      totalPages: pages,
      currPage: query.page
    })

  } catch (error) {
    console.log(error);
  }
}

exports.deleteExpence = async (req, res) => {
  try {
    const { id } = req.params;
    const expence = await Expence.findOne({ _id: id });

    await User.findByIdAndUpdate(req.user._id,{ totalExpence: req.user.totalExpence - expence.expence });

    await Expence.findByIdAndDelete(id);

    res.json("expence deleted successfully");
  } catch (error) {

    console.log(error);
  }
}

exports.getLeaderboard = async (req, res) => {
  try {
    const results = await User.find({});
    console.log(results);
    res.json({
      data: results
    });
  } catch (error) {
    console.log(error);
  }
}



