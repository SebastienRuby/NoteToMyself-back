const client = require('../db/pg');
const moment = require('moment'); // require

class Memento{
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.content = obj.content;
        this.reminder = obj.reminder;
        this.memento_restaurant_id = obj.meal_restaurant_id;
    }

    // Method: POST
    // Path: /memento
    // Description: Create a memento
    static async create (req, res){
        const query = `INSERT INTO memento (name, content, reminder, memento_restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *` // query to create a memento
        const values = [req.body.name, req.body.content, req.body.reminder, req.body.memento_restaurant_id];
        try {
            const result = await client.query(query, values);
            res.json(result.rows[0]);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }        
    }

    // Method: PATCH
    // Path: /memento
    // Description: Update a memento
    static async update (req, res){
        let date = moment().format('MM/DD/YYYY HH:mm:ss');
            const query = 'UPDATE public.memento SET name=$1, content=$2, reminder=$3, memento_restaurant_id=$4 ,updated_at = $5 WHERE id=$6 RETURNING *';
            const values = [req.body.name, req.body.content , req.body.reminder , req.body.memento_restaurant_id ,date, req.headers.id];
            try {
                const result = await client.query(query, values);
                res.json(result.rows[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: err.message });
            }
    }

    // Method: DELETE
    // Path: /memento
    // Description: Delete a memento
    static async delete(req, res){
        const query = `DELETE FROM public.memento WHERE id = $1` // query to delete a memento
        const values = [req.headers.id];

        try {
            const result = await client.query(query, values);
            res.json({result :result.rows[0], message: 'memento deleted'});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

};

module.exports = Memento;