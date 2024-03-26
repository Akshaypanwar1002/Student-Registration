const mongoose = require('mongoose')

 const dbConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
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