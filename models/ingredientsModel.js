const db = require("./database");

/*
====================================
CREATE INGREDIENT
====================================
*/

exports.createIngredient = async (ingredient) => {

    await db.query(
        `INSERT INTO ingredients 
        (ingredient_id, ingredient_name, stock_quantity, status, unit)
        VALUES (?, ?, ?, ?, ?)`,
        [
            ingredient.ingredient_id,
            ingredient.ingredient_name,
            ingredient.stock_quantity,
            ingredient.status,
            ingredient.unit
        ]
    );
};

/*
====================================
GET ALL INGREDIENTS
====================================
*/

exports.getAllIngredients = async () => {
    const [rows] = await db.query(
        "SELECT * FROM ingredients"
    );
    return rows;
};

/*
====================================
GET BY ID
====================================
*/

exports.getIngredientById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM ingredients WHERE ingredient_id = ?",
        [id]
    );

    return rows[0];
};

/*
====================================
UPDATE INGREDIENT
====================================
*/

exports.updateIngredient = async (id, data) => {

    await db.query(
        `UPDATE ingredients 
        SET ingredient_name=?, stock_quantity=?, status=?, unit=?
        WHERE ingredient_id=?`,
        [
            data.ingredient_name,
            data.stock_quantity,
            data.status,
            data.unit,
            id
        ]
    );
};

/*
====================================
DELETE INGREDIENT
====================================
*/

exports.deleteIngredient = async (id) => {

    await db.query(
        "DELETE FROM ingredients WHERE ingredient_id=?",
        [id]
    );
};