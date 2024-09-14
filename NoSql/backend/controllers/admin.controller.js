const Product = require("../models/product.model");

exports.createProduct = async (req, res)=>{
  try {

    const {title, desc, price, imageUrl} = req.body;

    await Product.create({title, desc, price, imageUrl});

    res.json({
      message:"product created successfully"
    })
    
  } catch (error) {
    console.log(error);
  }
}

exports.fetchProduct = async (req, res)=>{
  try {
    const products = await Product.find({});

    res.json({products});

  } catch (error) {
    console.log(error);
  }
}

exports.updateProduct = async (req, res)=>{
  try {
    const {id}= req.params;
    const {title, price, imageUrl, desc} = req.body;

    await Product.findByIdAndUpdate(id, {title, price, imageUrl, desc});

    res.json({
      message:"product updated successfully"
    })
  } catch (error) {
    console.log(error);
  }
}

exports.deleteProduct = async (req, res)=>{
  try {

    const {id} = req.params;

    await Product.deleteOne({where : {_id : id}});

    res.json({
      message:"product deleted successfully"
    })
    
  } catch (error) {
    console.log(error);
  }
}