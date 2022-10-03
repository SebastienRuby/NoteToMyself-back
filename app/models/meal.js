
const client = require('../db/pg');
const meal = {
    // Method: POST
    // Path: /meal
    // Description: Create a meal
    async create (req, res){
        const query = `INSERT INTO meal (name, slug, photo_url, favorite,review, meal_restaurant_id) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *` // query to create a meal
        const values = [req.body.name, req.body.slug, req.body.photo_url, req.body.favorite, req.body.review, req.body.meal_restaurant_id];

        try {
            const result = await client.query(query, values);
            res.json(result.rows[0]);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }        
    },

    // Method: PATCH
    // Path: /meal
    // Description: Update a meal
    async update (req, res){
        const query = `UPDATE meal SET name = $1, slug = $2, photo_url = $3, favorite = $4, review = $5, meal_restaurant_id = $6 WHERE id = $7 RETURNING *` // query to update a meal
        const values = [req.body.name, req.body.slug,req.body.photo_url, req.body.favorite, req.body.review, req.body.meal_restaurant_id, req.body.id];

        try {
            const result = await client.query(query, values);
            res.json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },


    // Method: DELETE
    // Path: /meal
    // Description: Delete a meal

    async delete(req, res){
        const query = `DELETE FROM public.meal WHERE id = $1` // query to delete a meal
        const values = [req.headers.id];

        try {
            const result = await client.query(query, values);
            res.json({result :result.rows[0], message: 'Meal deleted'});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

};

module.exports = meal;