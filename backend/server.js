const express = require('express');
const dotenv = require("dotenv");
const cors=require("cors");
// const mongoose = require('mongoose');
const authRoute=require("./routes/auhtRoute")
const connectToMongoDb = require('./config/db');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT=process.env.PORT;

app.use("",authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToMongoDb();
  });






