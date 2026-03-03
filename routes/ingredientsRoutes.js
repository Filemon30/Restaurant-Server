const express = require("express");
const router = express.Router();

const ingredientsController = require("../controllers/ingredientsController");
const authMiddleware = require("../middleware/authMiddleware");

/*
==============================
INGREDIENT ROUTES
==============================
*/

router.post("/", authMiddleware, ingredientsController.createIngredient);

router.get("/", authMiddleware, ingredientsController.getAllIngredients);

router.get("/:id", authMiddleware, ingredientsController.getIngredientById);

router.put("/:id", authMiddleware, ingredientsController.updateIngredient);

router.delete("/:id", authMiddleware, ingredientsController.deleteIngredient);

module.exports = router;