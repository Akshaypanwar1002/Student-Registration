const mongoose = require('mongoose');

// Define a schema for the data
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber : String,
    course : String
});

// Define a model for the schema
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
