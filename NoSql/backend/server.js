const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./utils/db');
dotenv.config();
const app = express();
const adminRouter = require("./routers/admin.router");
const shopRouter = require("./routers/shop.router");

app.use(adminRouter);
app.use(shopRouter);

connectDB();

app.listen(3000, ()=>{
  console.log("server run on port 3000");
})