const generateID = require("../utils/idGenerator");
const ingredientModel = require("../models/ingredientsModel");

/*
====================================
CREATE INGREDIENT
====================================
*/

exports.createIngredient = async (req, res) => {
    try {

        const { ingredient_name, stock_quantity, unit, status } = req.body;

        if (!ingredient_name || stock_quantity === undefined || !unit) {
            return res.status(400).json({
                message: "Ingredient name, stock quantity and unit are required"
            });
        }

        const ingredient = {
            ingredient_id: generateID(),
            ingredient_name,
            stock_quantity,
            status: status || "High",
            unit
        };

        await ingredientModel.createIngredient(ingredient);

        res.status(201).json({
            message: "Ingredient created successfully",
            ingredient_id: ingredient.ingredient_id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

/*
====================================
GET ALL INGREDIENTS
====================================
*/

exports.getAllIngredients = async (req, res) => {
    try {

        const data = await ingredientModel.getAllIngredients();

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

/*
====================================
GET INGREDIENT BY ID
====================================
*/

exports.getIngredientById = async (req, res) => {
    try {

        const data = await ingredientModel.getIngredientById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Ingredient not found"
            });
        }

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

/*
====================================
UPDATE INGREDIENT
====================================
*/

exports.updateIngredient = async (req, res) => {
    try {

        await ingredientModel.updateIngredient(req.params.id, req.body);

        res.json({
            message: "Ingredient updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

/*
====================================
DELETE INGREDIENT
====================================
*/

exports.deleteIngredient = async (req, res) => {
    try {

        await ingredientModel.deleteIngredient(req.params.id);

        res.json({
            message: "Ingredient deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};