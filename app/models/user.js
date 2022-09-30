const client = require('../db/pg'); // import the client
const bcrypt = require('bcrypt'); // import bcrypt

class User {
  constructor() {
    this.username = username;
    this.password = password;
    this.email = email;
    this.photo = photo;
    this.token = token;
  }
  //create username and password
  static async create(username, password, email) {
    const passwordcrypt = await bcrypt.hash(password, 10);
    const result  = await client.query(
      'INSERT INTO public."user" (username, password, email) VALUES ($1, $2, $3)',
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
    if(result?.rows.length > 0){
            
      return new User(result.rows[0]);
    }
  else{
      return;
    }
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}


module.exports = User;