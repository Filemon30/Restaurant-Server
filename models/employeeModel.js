const db = require("./database");

/*
====================================
CREATE EMPLOYEE
====================================
*/
exports.createEmployee = async (employee) => {

    const sql = `
        INSERT INTO employees 
        (employee_id, role_id, first_name, last_name, contact_number, hire_date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
        employee.employee_id,
        employee.role_id,
        employee.first_name,
        employee.last_name,
        employee.contact_number,
        employee.hire_date
    ]);
};

/*
====================================
GET ALL EMPLOYEES
====================================
*/
exports.getEmployees = async () => {

    const [rows] = await db.query(
        "SELECT * FROM employees"
    );

    return rows;
};

/*
====================================
GET EMPLOYEE BY ID
====================================
*/
exports.getEmployeeById = async (id) => {

    const [rows] = await db.query(
        "SELECT * FROM employees WHERE employee_id = ?",
        [id]
    );

    return rows[0];
};