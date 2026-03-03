const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

/*
====================================
EMPLOYEE ROUTES
====================================
*/

// Create employee
router.post("/", authMiddleware, employeeController.createEmployee);

// Get all employees
router.get("/", authMiddleware, employeeController.getEmployees);

// Get employee by ID
router.get("/:id", authMiddleware, employeeController.getEmployeeById);

module.exports = router;