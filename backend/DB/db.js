const mongoose = require('mongoose')

const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "akshay",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};

module.exports = dbConnection;