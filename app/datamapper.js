/* on regroupe les fonctions qui permettent d'accéder aux données
à l'intérieur de ce module dataMapper 
Afin d'éviter le risque d'injection SQL, on utilisera systématiquement des requêtes
préparées :
  - on défini d'abord un objet contenant la requête (propriété text) et les valeurs à
    substituer (propriété values)
  - on passe cet objet à la méthode query, qui s'occupera de créer la requête pour nous
    en s'assurant que les valeurs sont correctes
ex:
  const query = {
    text: `SELECT * FROM "promo" WHERE "id"=$1`,
    values: [id],
  };
  const result = await client.query(query);
*/

const client = require("./pg");

const dataMapper = {
  findAllRestaurantFavoriteOnly: async () => {
    const query = {
      text: `SELECT * FROM "restaurant" Where "favorite" = true`,
    };
    const result = await client.query(query);
    return result.rows;
  },
  findAllRestaurantByUserId: async (id) => {
    const query = {
      text: `SELECT * FROM "restaurant" WHERE "user_id"=$1`,
      values: [id],
    };

    const result = await client.query(query);
    if (result.rows.length) {
      return result.rows[0];
    } else {
      return null;
    }
  },
  findAllMealByRestaurantIdAndUserId: async (id) => {//incomplete
    const query = {
      text: `SELECT * FROM "meal" WHERE "restaurant_id"=$1 and "user_id"=$2`,
      values: [id],//incomplete
    };

    const result = await client.query(query);
    return result.rows;
  },
  findStudentById: async (id) => {
    const query = {
      text: `SELECT * FROM "student" WHERE "id"=$1`,
      values: [id],
    };
    const result = await client.query(query);
    if (result.rows.length) {
      return result.rows[0];
    } else {
      return null;
    }
  },
  addRestaurant: async (restaurant) => {
    const query = {
      text:`INSERT INTO "restaurant" ("name", " ", ", "") VALUES ($1, $2, $3, $4)`,
      values: [student.first_name, student.last_name, student.github_username, student.promo],
    };
    const result = await client.query(query);
    // la propriété rowCount contient le nombre d'enbregistrement ajoutés 
    return result.rowCount;
  },
   
};

module.exports = dataMapper;
