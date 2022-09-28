// get all restaurant 
const client = require('../db/pg');

const restaurant= {

    async getAllRestaurantByFavorite(req, res) {
        try {
            const restaurantQuery = `SELECT * FROM restaurant ORDER BY favorite ASC`;
            const result = await client.query(restaurantQuery);
            res.json(result.rows);
        } catch (error) {
            console.error(error).status(error.status || 500);
        }
       
    },

    async getAllRestaurantFavoriteOnly(req, res) {
        try {
        const restaurantFavOnlyQuery = `SELECT * FROM restaurant WHERE favorite = true ORDER BY id`;
        const result = await client.query(restaurantFavOnlyQuery);
        res.json(result.rows);
        } catch (error) {
            console.error(error).status(error.status || 500);
        }

    },

    async getRestaurantById(req, res) {
        try {
        const restaurantIdQuery = `SELECT * FROM restaurant WHERE id = $1`;
        const result = await client.query(restaurantIdQuery, [req.params.id]);
        res.json(result.rows[0]);
        } catch (error) {
            console.error(error).status(error.status || 500);
        }
    },
    
}

module.exports = restaurant;