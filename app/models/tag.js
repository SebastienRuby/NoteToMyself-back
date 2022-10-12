const client = require('../db/pg');

class Tag {
  constructor(obj) {
    this.id = obj.id;
    this.label = obj.label;
  }

  // Method: PATCH
  // Path: /tag
  // Replace tags for a meal / restaurant
  static async setTags(req, res) {
    if(req.body.tags.length < 1){
      return res.status(400);
    }

    const restaurantOrMeal = req.headers.type === 'restaurant' ? 'tag_restaurant' : 'tag_meal';
    const deleteQuery = `DELETE FROM ${restaurantOrMeal} WHERE ${restaurantOrMeal}_id = $1`;
    const deleteValues = [req.headers.id];
    try {
      await client.query(deleteQuery, deleteValues);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }

    let setStr = '';
    req.body.tags.forEach( tag => setStr += `('${tag.label}', '${req.headers.id}'),`);
    let setStrSliced = setStr.slice(0, -1);
    const createQuery = `INSERT INTO ${restaurantOrMeal} (label, ${restaurantOrMeal}_id) VALUES ${setStrSliced} RETURNING *`;
    try {
      const result = await client.query(createQuery);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

}

module.exports = Tag;
