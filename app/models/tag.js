const client = require('../db/pg');

class Tag {
  constructor(obj) {
    this.id = obj.id;
    this.label = obj.label;
  }

  // Method: POST
  // Path: /tag/restaurant
  // Create a tag for a restaurant
  static async createTagRestaurant(req, res) {
    const query = 'INSERT INTO tag_restaurant (label) VALUES ($1) RETURNING *'; // query to create a tag for a restaurant
    const values = [req.body.label];

    try {
      const result = await client.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Method: DELETE
  // Path: /tag/restaurant
  // Delete a tag for a restaurant
  static async deleteTagRestaurant(req, res) {
    const query = 'DELETE FROM tag_restaurant WHERE id = $1 RETURNING *'; // query to delete a tag for a restaurant
    const values = [req.body.id];

    try {
      await client.query(query, values);
      res.json('Tag delete');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Method: POST
  // Path: /tag/restaurant
  // Create a tag for a restaurant
  static async createTagMeal(req, res) {
    const query = 'INSERT INTO tag_meal (label) VALUES ($1) RETURNING *'; // query to create a tag for a restaurant
    const values = [req.body.label];

    try {
      const result = await client.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Method: DELETE
  // Path: /tag/restaurant
  // Delete a tag for a restaurant
  static async deleteTagMeal(req, res) {
    const query = 'DELETE FROM tag_meal WHERE id = $1 RETURNING *'; // query to delete a tag for a restaurant
    const values = [req.body.id];

    try {
      await client.query(query, values);
      res.json('Tag delete');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = Tag;
