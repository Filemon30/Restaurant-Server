require("dotenv").config();

const express = require("express");
const cors = require("cors");

/*
====================================
ROUTES IMPORT
====================================
*/

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const ingredientRoutes = require("./routes/ingredientsRoutes");

/*
====================================
APP CONFIGURATION
====================================
*/

const app = express();

app.use(cors());
app.use(express.json());

/*
====================================
API ROUTES
====================================
*/

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/ingredients", ingredientRoutes);

/*
====================================
HEALTH CHECK ROUTE
====================================
*/

app.get("/api", (req, res) => {
    res.send("Restaurant Management System API Running");
});

/*
====================================
404 HANDLER
====================================
*/

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

/*
====================================
GLOBAL ERROR HANDLER
====================================
*/

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Internal Server Error"
    });
});

/*
====================================
SERVER START
====================================
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});