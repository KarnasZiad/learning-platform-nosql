const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/create", studentController.createStudent);

router.get("/:id", studentController.getStudent);

router.get("/", studentController.getStudents);

router.put("/:id", studentController.updateStudent);

router.delete("/:id", studentController.deleteStudent);

router.post("/:id/enroll", studentController.enrollCourse);

router.get("/:id/courses", studentController.getStudentEnrolledCourses);

module.exports = router;
