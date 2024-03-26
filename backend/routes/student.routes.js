const express = require('express')
const {createStudent,getStudents, allCourse, getCourse, addCourse, updateStudentCourse} = require("../controllers/student.controllers")

const router = express.Router();

router.get("/allCourse", allCourse);
router.get("/courseStudents/:name", getCourse);
router.post("/createStudent",createStudent);
router.post("/updateCourseStudent/:studentId",updateStudentCourse);
router.post("/addCourse", addCourse);
router.get("/getStudents", getStudents);

module.exports = router;