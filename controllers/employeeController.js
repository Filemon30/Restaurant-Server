const { v4: uuidv4 } = require("uuid");
const employeeModel = require("../models/employeeModel");

/*
====================================
CREATE EMPLOYEE
====================================
*/
exports.createEmployee = async (req, res) => {
    try {

        const { role_id, first_name, last_name, contact_number, hire_date } = req.body;

        if (!role_id || !first_name || !last_name) {
            return res.status(400).json({
                message: "Role, first name and last name are required"
            });
        }

        const newEmployee = {
            employee_id: uuidv4(),
            role_id,
            first_name,
            last_name,
            contact_number: contact_number || null,
            hire_date: hire_date || null
        };

        await employeeModel.createEmployee(newEmployee);

        res.status(201).json({
            message: "Employee created successfully",
            employee_id: newEmployee.employee_id
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

/*
====================================
GET ALL EMPLOYEES
====================================
*/
exports.getEmployees = async (req, res) => {
    try {

        const employees = await employeeModel.getEmployees();

        res.json({
            message: "Employees retrieved successfully",
            data: employees
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

/*
====================================
GET EMPLOYEE BY ID
====================================
*/
exports.getEmployeeById = async (req, res) => {
    try {

        const employee = await employeeModel.getEmployeeById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json({
            message: "Employee retrieved successfully",
            data: employee
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};