const client = require('../db/pg'); // import the client

const restaurants = {
    // Method: GET
    // Path: /restaurants
    // Description: Get all restaurants
    getAll: (req, res) => {
        const query = 'SELECT * from restaurant where user_id = $1' // query to get all restaurant
       
        client.query(query ,[req.headers.userid])
            .then((result) => {
                res.json(result.rows);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
    },

    // Method: GET
    // Path: /restaurant
    // Description: Get one restaurant
    getOne: (req, res) => {
        const query = 'SELECT restaurant.name as restaurant_name, restaurant.slug as restaurant_slug,restaurant.location as restaurant_location,restaurant.favorite as restaurant_favorite,tag_restaurant.id as tagRestaurant_id,tag_restaurant.label as tagRestaurant_label,meal.id as meal_id,meal.name as meal_name,meal.slug as meal_slug,meal.favorite as meal_favorite,meal.created_at as meal_time,tag_meal.label as tag_meal From restaurant Join restaurant_has_tag on restaurant_id = restaurant.id Join tag_restaurant on tag_restaurant.id = tag_restaurant_id Join meal on meal_restaurant_id = restaurant.id Join meal_has_tag on meal_id = meal.id Join tag_meal on tag_meal.id = tag_meal_id where restaurant_id = $1' // query to get one restaurant

        client.query(query,[req.headers.restaurantid])
            .then((result) => {
                res.json(result.rows);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
    },

    // Method: POST
    // Path: /restaurants
    // Description: Create a restaurant
    create: (req, res) => {
        const query = 'INSERT INTO public.restaurant (name, slug, location,photo_url, favorite , comment, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        client.query(query, [req.body.name, req.body.slug, req.body.location,req.body.photo_url, req.body.favorite, req.body.comment, req.headers.user_id])
            .then((result) => {
                res.json(result.rows[0]);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
    },

    // Method: PATCH
    // Path: /restaurants/:id
    // Description: Update a restaurant

    // a voir pour récupérer les données de l'objet pour la modification 
    update: (req, res) => {
        const query = 'UPDATE public.restaurant SET name=$1, slug=$2, location=$3,photo_url=$4,favorite=$5, comment=$6 WHERE id=$7 RETURNING *';
        client.query(query, [req.body.name, req.body.slug, req.body.location,req.body.photo_url, req.body.favorite, req.body.comment, req.headers.id])
            .then((result) => {
                res.json(result.rows[0]);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
    },

    // Method: DELETE
    // Path: /restaurant
    // Description: Delete a restaurant
    delete: (req, res) => {
        const query = 'DELETE FROM public.restaurant WHERE id=$1';
        client.query(query, [req.headers.id])
            .then((result) => {
                res.json({result :result.rows[0], message:'deleted'});
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
    },
};



module.exports = restaurants;