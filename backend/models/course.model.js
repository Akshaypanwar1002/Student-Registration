const mongoose = require('mongoose');

// Define a schema for the data
const courseSchema = new mongoose.Schema({
 name : String,
 totalStudents: {
    type: Number,
    default: 0 // Set default value to 0
  }
});

// Define a model for the schema
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
