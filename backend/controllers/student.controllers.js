const Student = require("../models/student.model");
const Course = require("../models/course.model");

async function createStudent(req, res) {
  try {
    console.log("hello")
    const data = req.body;
    const student = await Student.create(data);
    await Course.findOneAndUpdate(
      { name: data.course }, // Find the course by name
      { $inc: { totalStudents: 1 } }, // Increment totalStudents count by 1
      { new: true } // Ensure we get the updated document
    );
    if (data) {
      res.send(student);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating student");
  }
}
async function updateStudentCourse(req, res) {
  try {
    const { studentId } = req.params; // Assuming the student ID is passed as a parameter
    const { course } = req.body; // Assuming the new course name is sent in the request body
    console.log(studentId)
    // Update the student's course in the database
    const updatedStudent = await Student.findByIdAndUpdate(studentId, { course }, { new: true });

    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }

    // Send the updated student data as response
    res.send(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating student course");
  }
}

async function getStudents(req, res) {
  try {
    const students = await Student.find({});
    if (data) {
      res.send(students);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating student");
  }
}

async function allCourse(req, res) {
  try {
    const course = await Course.find({});
    if (course) {
      return res.status(200).send(course);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
}

async function getCourse(req, res) {
  try {
    const { name } = req.params;
    const course = await Student.find({course : name});
    if (course) {
      return res.status(200).send(course);
    }
    res.status(400).send("could not get course");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating student");
  }
}

async function addCourse(req, res) {
  try {
    const { name, totalStudents } = req.body;
    const newCourse = new Course({
      name
    });

    // Save the new course to the database
    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating student");
  }
}

module.exports = {
  createStudent,
  allCourse,
  getCourse,
  addCourse,
  getStudents,
  updateStudentCourse
};
