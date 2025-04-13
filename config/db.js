const mongoose = require("mongoose");
const dotenv = require("dotenv");



dotenv.config({ path: "./.env" });


const db = process.env.DATABASE;
//Db connection 
const dbConnect = async () => {
  try {
    await mongoose.connect(db, {
     
    });
    console.log("Database connection successfull");
  } catch (err) {
    console.log("Connection to database failed", err);
  }
};

module.exports = dbConnect;
