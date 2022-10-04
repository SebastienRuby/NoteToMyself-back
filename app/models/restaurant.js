const client = require('../db/pg'); // import the client

const restaurants = {
    // Method: GET
    // Path: /restaurants
    // Description: Get all restaurants
    async getAll(req, res){
        const query = 
        `SELECT restaurant.id,
        restaurant.name,
        restaurant.slug,
        restaurant.favorite,
        restaurant.photo_url,
        restaurant.location,
        restaurant.created_at,
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

    },

    // Method: GET
    // Path: /restaurant
    // Description: Get one restaurant
    async getOne(req, res){
        const query =  /* `SELECT  restaurant.id,
        restaurant.name,
        restaurant.slug,
        restaurant.favorite,
        restaurant.photo_url,
        restaurant.location,
        restaurant.created_at,
        ARRAY((Select row_to_json(_) from (select meal.id, meal.name, meal.slug, meal.photo_url, 
        meal.favorite, meal.review , meal.created_at, ARRAY_AGG(tag_meal.label) as tag_meal from meal ) as _ )) as Meal,
		ARRAY_AGG(tag_restaurant.label) AS tag_restaurant_Label,
        ARRAY((Select row_to_json(_) from (select memento.*) as _ )) AS Memento
        FROM restaurant
        JOIN restaurant_has_tag ON restaurant_id = restaurant.id
        JOIN tag_restaurant ON tag_restaurant.id = tag_restaurant_id
        JOIN meal ON meal_restaurant_id = restaurant.id
        JOIN meal_has_tag ON meal_id = meal.id
        JOIN tag_meal ON tag_meal.id = tag_meal_id
        JOIN memento ON memento_restaurant_id = restaurant.id
        WHERE restaurant.id = $1 and user_id = $2
		GROUP BY restaurant.id, meal.id, memento.id`   */
        // query to get one restaurant 
        `SELECT
        restaurant.id,
        restaurant.name,
        restaurant.slug,
        restaurant.favorite,
        restaurant.photo_url,
        restaurant.location,
        restaurant.created_at,
        ARRAY((Select row_to_json(_) from (select meal.id, meal.name, meal.slug, meal.photo_url,
        meal.favorite, meal.review , meal.created_at, ARRAY_AGG(tag_meal.label) as tag_meal from meal
        JOIN meal_has_tag ON meal_id = meal.id
        JOIN tag_meal ON tag_meal.id = tag_meal_id 
        where meal_restaurant_id = restaurant.id 
        Group by  meal.id, meal.name, meal.slug, meal.photo_url,
        meal.favorite, meal.review , meal.created_at) as _ )) as Meal,
        ARRAY((Select row_to_json(_) from (select memento.*  from memento where memento_restaurant_id = restaurant.id) as _ )) AS Memento
        FROM restaurant
        WHERE restaurant.id = $1 and user_id = $2
        GROUP BY restaurant.id`	

        const values = [req.headers.restaurantid , req.headers.userid];

        try {
            const result = await client.query(query, values);
            res.json(result.rows);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },

    // Method: POST
    // Path: /restaurants
    // Description: Create a restaurant
    async create(req, res){
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
    },

    // Method: PATCH
    // Path: /restaurants/:id
    // Description: Update a restaurant

    // a voir pour récupérer les données de l'objet pour la modification 
    async update(req, res){
        const query = 'UPDATE public.restaurant SET name=$1, slug=$2, location=$3,photo_url=$4,favorite=$5, comment=$6 WHERE id=$7 RETURNING *';
        const values = [req.body.name, req.body.slug, req.body.location, req.body.photo_url, req.body.favorite, req.body.comment, req.headers.id];

        try {
            const result = await client.query(query, values);
            res.json(result.rows[0]);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },
    // Method: DELETE
    // Path: /restaurant
    // Description: Delete a restaurant
    async delete(req, res){
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
    },
};



module.exports = restaurants;