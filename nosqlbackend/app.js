const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app =express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const userRouter= require("./routers/user.router");
const expenceRouter = require("./routers/expence.router");

const path= require("path");
const { connectDB } = require("./utils/database");
app.use(userRouter);
app.use(expenceRouter);

app.use((req, res)=>{
  console.log(req.url);
  res.sendFile(path.join(__dirname, `public/${req.url}`));
})


connectDB();

app.listen(process.env.PORT);

//my new comment