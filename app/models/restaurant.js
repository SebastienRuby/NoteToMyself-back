const client = require('../db/pg'); // import the client
const moment = require('moment'); // require

class Restaurant {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.slug = obj.slug;
        this.photo_url = obj.photo_url;
        this.location = obj.location;
        this.favorite = obj.favorite;
        this.comment = obj.comment;
        this.user_id = obj.user_id;
    }

    // Method: GET
    // Path: /restaurants
    // Description: Get all restaurants
    static async getAll(req, res){
        const query = 
        `SELECT restaurant.id,
        restaurant.name,
        restaurant.slug,
        restaurant.favorite,
        restaurant.photo_url,
        restaurant.location,
        to_char(restaurant.created_at,'dd/MM/YYYY HH24:MI:SS') AS created_at,
        to_char(restaurant.updated_at,'dd/MM/YYYY HH24:MI:SS') AS updated_at,
		ARRAY_AGG(tag_restaurant.label) AS tag_restaurantLabel
        FROM restaurant
        JOIN restaurant_has_tag ON restaurant_id = restaurant.id
        JOIN tag_restaurant ON tag_restaurant.id = tag_restaurant_id 
        WHERE user_id = $1
		GROUP BY restaurant.id`// query to get all restaurant
       
        const values = [req.headers.userid];

        try {
            const result = await client.query(query, values);
            res.json(result.rows);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }

    }

    // Method: GET
    // Path: /restaurant
    // Description: Get one restaurant
    static async getOne(req, res){
        
        const query = `SELECT
        restaurant.id,
        restaurant.name,
        restaurant.slug,
        restaurant.favorite,
        restaurant.photo_url,
        restaurant.location,
        to_char(restaurant.created_at,'dd/MM/YYYY HH24:MI:SS') AS created_at,
        to_char(restaurant.updated_at,'dd/MM/YYYY HH24:MI:SS') AS updated_at, 
        (select ARRAY_AGG(tag_restaurant.label) labels
        FROM restaurant
                JOIN restaurant_has_tag on restaurant_id = restaurant.id
                JOIN tag_restaurant ON tag_restaurant_id = tag_restaurant.id
                where restaurant.id = $1),
        ARRAY((SELECT row_to_json(_) FROM (SELECT meal.id, meal.name, meal.slug, meal.photo_url,
        meal.favorite, meal.review ,meal.meal_restaurant_id, to_char(meal.created_at,'dd/MM/YYYY HH24:MI:SS') AS created_at, to_char(meal.updated_at,'dd/MM/YYYY HH24:MI:SS') AS updated_at, ARRAY_AGG(tag_meal.label) AS tag_meal FROM meal
        JOIN meal_has_tag ON meal_id = meal.id
        JOIN tag_meal ON tag_meal.id = tag_meal_id 
        WHERE meal.meal_restaurant_id = restaurant.id 
        GROUP BY  meal.id, meal.name, meal.slug, meal.photo_url,
        meal.favorite, meal.review , meal.created_at) AS _ )) AS Meal,
        ARRAY((SELECT row_to_json(_) FROM (SELECT memento.id, memento.name, memento.content, memento.reminder,memento.memento_restaurant_id, to_char(memento.created_at,'dd/MM/YYYY HH24:MI:SS') AS created_at, to_char(memento.updated_at,'dd/MM/YYYY HH24:MI:SS') AS updated_at FROM memento WHERE memento_restaurant_id = restaurant.id) AS _ )) AS Memento
        FROM restaurant
        WHERE restaurant.id = $1
        GROUP BY restaurant.id`;

        const values = [req.headers.restaurantid];

        try {
            const result = await client.query(query, values);
            res.json(result.rows);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    // Method: POST
    // Path: /restaurants
    // Description: Create a restaurant
    static async create(req, res){
        const query = 'INSERT INTO public.restaurant (name, slug, location,photo_url, favorite , comment, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [req.body.name, req.body.slug, req.body.location, req.body.photo_url, req.body.favorite, req.body.comment, req.headers.user_id];

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
    // Path: /restaurants/:id
    // Description: Update a restaurant

    // a voir pour récupérer les données de l'objet pour la modification 
    static async update(req, res){
        let date = moment().format('MM/DD/YYYY HH:mm:ss');
        const query = 'UPDATE public.restaurant SET name=$1, slug=$2, location=$3,photo_url=$4,favorite=$5, comment=$6 , updated_at = $7 WHERE id=$8 RETURNING *';
        const values = [req.body.name, req.body.slug, req.body.location, req.body.photo_url, req.body.favorite, req.body.comment, date, req.headers.id];

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
    // Path: /restaurant
    // Description: Delete a restaurant
    static async delete(req, res){
        const query = 'DELETE FROM public.restaurant WHERE id=$1';
        const values = [req.headers.id];

        try {
            const result = await client.query(query, values);
            res.json({result :result.rows[0], message: 'Restaurant deleted'});
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
};
module.exports = Restaurant;