const client = require('../db/pg');

/**
 * @typedef Tag
 * @property {string} label.required
 */

class Tag {
  constructor(obj) {
    this.id = obj.id;
    this.label = obj.label;
  }

  /**
   * @param {*} req
   * @param {*} res
   * @returns
   */

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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
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
