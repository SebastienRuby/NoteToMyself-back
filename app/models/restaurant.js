const client = require('../db/pg'); // import the client

const restaurants = {
    // Method: GET
    // Path: /restaurants
    // Description: Get all restaurants
    getAll: (req, res) => {
        const query = 'SELECT * FROM public.restaurant';
        client.query(query)
            .then((result) => {
                res.json(result.rows);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
    },

    // Method: GET
    // Path: /restaurants/:id
    // Description: Get one restaurant
    getOne: (req, res) => {
        const query = 'SELECT * FROM public.restaurant WHERE id = $1';

        client.query(query, [req.params.id])
            .then((result) => {
                res.json(result.rows[0]);
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
        const query = 'INSERT INTO public.restaurant (name, slug, location, favorite , comment, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        client.query(query, [req.body.name, req.body.slug, req.body.location, req.body.favorite, req.body.comment, req.body.user_id])
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
        const query = 'UPDATE public.restaurant SET name=$1, slug=$2, location=$3, favorite=$4, comment=$5 WHERE id=$6 RETURNING *';
        client.query(query, [req.body.name, req.body.slug, req.body.location, req.body.favorite, req.body.comment, req.params.id])
            .then((result) => {
                res.json(result.rows[0]);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
    },

    // Method: DELETE
    // Path: /restaurants/:id
    // Description: Delete a restaurant
    delete: (req, res) => {
        const query = 'DELETE FROM public.restaurant WHERE id=$1';
        client.query(query, [req.params.id])
            .then((result) => {
                res.json({result :result.rows[0], message:'deleted'});
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
    }
};

module.exports = restaurants;