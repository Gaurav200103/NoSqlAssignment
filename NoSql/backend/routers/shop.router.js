const express = require("express");
const { fetchProduct } = require("../controllers/shop.controller");
const router = express.Router();

router.get("/getProducts", fetchProduct);

module.exports = router;