const Product = require("../models/product.model");


exports.fetchProduct = async (req, res)=>{
  try {
    const products = await Product.find({});

    res.json({products});
    
  } catch (error) {
    console.log(error);
  }
}

