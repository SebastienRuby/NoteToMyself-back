const client = require('../db/pg');

const meal = {

    async getAllMeal(req, res) {
        const mealQuery = `SELECT * FROM meal ORDER BY id`;
        const result = await client.query(mealQuery);
        res.json(result.rows);
    },

    async getMealById(req, res) {
        const mealIdQuery = `SELECT * FROM meal WHERE id = $1`;
        const result = await client.query(mealIdQuery, [req.params.id]);
        res.json(result.rows[0]);
    },

    async getMealByRestaurantId(req, res) {
        const mealRestaurantIdQuery = `SELECT * FROM meal WHERE restaurant_id = $1`;
        const result = await client.query(mealRestaurantIdQuery, [req.params.id]);
        res.json(result.rows);
    },

    async getMealByRestaurantIdAndFavorite(req, res) {
        const mealRestaurantIdAndFavoriteQuery = `SELECT * FROM meal WHERE restaurant_id = $1 AND favorite = true`;
        const result = await client.query(mealRestaurantIdAndFavoriteQuery, [req.params.id]);
        res.json(result.rows);
    }
    
}

module.exports = meal;