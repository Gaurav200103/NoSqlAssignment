const express = require("express");
const { createProduct, fetchProduct } = require("../controllers/admin.controller");
const router = express.Router();

router.post("/addProduct", createProduct);
router.get("/getProducts", fetchProduct);

module.exports = router;