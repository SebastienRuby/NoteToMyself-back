const client = require('../db/pg'); // import the client
const bcrypt = require('bcrypt'); // import bcrypt

class User {
  constructor(obj) {
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
    this.email = obj.email;
    this.token = obj.token;
    this.dark = obj.dark;
    this.photo_url = obj.photo_url;
  }
  //create username and password
  static async create(username, password, email) {
    const passwordcrypt = await bcrypt.hash(password, 10);
    const result = await client.query(
      'INSERT INTO public.user (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, passwordcrypt, email]
    );
    const user = new User(result.rows[0]);
    return user;
  }

  static async findUserByEmail(email) {
    const result = await client.query(
      'SELECT * FROM public.user WHERE email=$1',
      [email]
    );
    if (result.rows.length > 0) {
      return new User(result.rows[0]);
    } else {
      return null;
    }
  }

  static async findUserById(id) {
    const result = await client.query('SELECT * FROM public.user WHERE id=$1', [id]);
    if (result.rows.length > 0) {
      return new User(result.rows[0]);
    } else {
      return null;
    }
  }

  static async delete(req, res) {
    const query = 'DELETE FROM public.user WHERE id=$1';
    const values = [req.headers.userid];
    try {
      await client.query(query, values);
      res.json({ message: 'User deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    const allowed = [
      'username',
      'password',
      'dark',
    ];
    let params = [];
    let setStr = '';
    for(var key in req.body) {
      if (allowed.some((allowedKey) => allowedKey === key)) {
        setStr += `${key} = '${req.body[key]}',`;
        if(key === 'password') {
          params.push(await bcrypt.hash(req.body[key], 10));
        } else
          params.push[key];
      }
    }
    const query =
      `UPDATE public.user SET ${setStr} WHERE id=$1 RETURNING *`;
    const values = [req.headers.userid];
    try {
      await client.query(query, values);
      res.json({ message: `User ${req.body.username} updated`});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
