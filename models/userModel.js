const db = require("./database");

exports.findByUsername = async (username) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
    return rows[0];
};

exports.createUser = async (user) => {
    await db.query(
        `INSERT INTO users 
        (user_id, employee_id, username, password) 
        VALUES (?, ?, ?, ?)`,
        [user.user_id, user.employee_id, user.username, user.password]
    );
};