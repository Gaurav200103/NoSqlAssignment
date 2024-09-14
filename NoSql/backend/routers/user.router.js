const express = require("express");
const { addUser, findUserById } = require("../controllers/user.controller");
const router = express.Router();

router.post("/addUser", addUser);
router.get("/user/:id", findUserById);

module.exports = router;