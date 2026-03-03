const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/userModel");

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findByUsername(username);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
        { id: user.user_id },
        "SECRET_KEY",
        { expiresIn: "8h" }
    );

    res.json({ token });
};

exports.register = async (req, res) => {
    const { employee_id, username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
        user_id: uuidv4(), // 🔥 Custom ID (NOT AUTO_INCREMENT)
        employee_id,
        username,
        password: hashed
    };

    await userModel.createUser(newUser);

    res.json({ message: "User created", user_id: newUser.user_id });
};