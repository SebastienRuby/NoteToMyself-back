const client = require('../db/pg'); // import the client
const bcrypt = require('bcrypt'); // import bcrypt

class User {
  constructor(obj) {
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
    this.email = obj.email;
    this.token = obj.token;
    this.photo = obj.photo;
  }
  //create username and password
  static async create(username, password, email) {
    const passwordcrypt = await bcrypt.hash(password, 10);
    const result  = await client.query(
      'INSERT INTO public."user" (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, passwordcrypt, email]
    );
   const user = new User(result.rows[0]);
   return user;
  }

  static async findUserByEmail(email) {
    const result = await client.query(
      'SELECT * FROM public."user" WHERE email=$1',
      [email]
    );
    if(result.rows.length > 0){
            return new User(result.rows[0]);
    }
    else{
        return null;
    }
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}


module.exports = User;