require('dotenv').config();
const { faker } = require("@faker-js/faker");
const debug = require("debug")("seeding");

const db = require("../app/db/pg");
debug.queryCount = 0;

faker.locale = "fr";
const NB_USERS = 1;
const NB_RESTAURANTS = 10;
const NB_RESTAURANTS_TAGS = 5;
const NB_MEAL = 40;
const NB_MEAL_TAGS = 3;
const NB_MEMENTOS = 7;

function pgQuoteEscape(row) {
  const newRow = {};
  Object.entries(row).forEach(([prop, value]) => {
    if (typeof value !== "string") {
      newRow[prop] = value;
      return;
    }
    newRow[prop] = value.replaceAll("'", "''");
  });
  return newRow;
}
function string_to_slug (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

// Fonction de géneration des utilisateur
function generateUsers(nbUsers) {
  const users = [];
  for (let i = 0; i < nbUsers; i += 1) {
    const user = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      photo: faker.internet.avatar()
    };
    users.push(user);
  }
  return users;
}
// Insertion des utilisateurs générés dans la BDD
async function insertUsers(users) {
  await db.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
  const userValues = users.map(
    (user) => `(
      '${user.username}',
      '${user.email}',
      '${user.password}',
      '${user.photo}'
    )`
  );

  const queryStr = `
      INSERT INTO "user"
    (
      "username",
      "email",
      "password",
      "photo"
    )
      VALUES
    (
      'Ulrich',
      'ulrich@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/36332744?v=4'
    ),-- superpass
    (
      'Alexis',
      'alexis@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/74763572?v=4'
    ), -- superpass
    (
      'Yann',
      'yann@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/17363842?v=4'
    ), -- superpass
    (
      'Jonas',
      'jonas@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/12894353?v=4'
    ), -- superpass
    (
      'Sebastien',
      'sebastien@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/87674596?v=4'
    ), -- superpass
    ${userValues}
    RETURNING id
  `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des restaurants
async function generateRestaurant(nbResto, userId) {
  const restaurants = [];
  for (let i = 0; i < nbResto; i += 1) {
    let name = `Chez ${faker.name.firstName()} ${faker.name.suffix()}`;
    let location = `${faker.address.buildingNumber()} ${faker.address.street()}, ${faker.address.city()} ${faker.address.zipCode()} France`;
    let slug = string_to_slug(name)

    const restaurant = {
      name,
      slug,
      comment: faker.company.catchPhrase(),
      favorite: faker.datatype.boolean(),
      user_id:
        userId[faker.datatype.number({ min: 0, max: userId.length - 1 })],
      location,
    };
    restaurants.push(restaurant);
  }
  return restaurants;
}
// Insertion des restaurants générés dans la BDD
async function insertRestaurant(restaurants) {
  await db.query('TRUNCATE TABLE "restaurant" RESTART IDENTITY CASCADE');
  const restaurantValues = restaurants.map((restaurant) => {
    const newRestaurant = pgQuoteEscape(restaurant);
    return `(
               '${newRestaurant.name}',
               '${newRestaurant.slug}',
               '${newRestaurant.comment}',
               ${newRestaurant.favorite},
               ${newRestaurant.user_id},
               '${newRestaurant.location}'
           )`;
  });

  const queryStr = `
           INSERT INTO "restaurant"
           (
               "name",
               "slug",
               "comment",
               "favorite",
               "user_id",
               "location"
           )
           VALUES
           ${restaurantValues}
           RETURNING id
   `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des tags de restaurant
function generateTagRestaurant(nbTagRestaurant) {
  const tagsRestaurant = [];
  for (let i = 0; i < nbTagRestaurant; i += 1) {
    const tagRestaurant = {
      label: faker.address.country(),
    };
    tagsRestaurant.push(tagRestaurant);
  }
  return tagsRestaurant;
}
// Insertion des tags de restaurant générés dans la BDD
async function insertTagRestaurant(tagsRestaurant) {
  await db.query('TRUNCATE TABLE "tag_restaurant" RESTART IDENTITY CASCADE');
  const tagRestaurantValues = tagsRestaurant.map((tagRestaurant) => {
    const newTagRestaurant = pgQuoteEscape(tagRestaurant);
    return `(
      '${newTagRestaurant.label}'
    )`;
  });

  const queryStr = `
    INSERT INTO "tag_restaurant"
    (
      "label"
    )
    VALUES
    ${tagRestaurantValues}
    RETURNING id
  `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Liaison des tags de restaurant aux restaurants
function generateRestaurantHasTag(restaurantIds, tagRestaurantIds) {
  const restaurantHasTags = restaurantIds
    .map((restaurantId) => {
      const tagRestaurantIdsFree = [...tagRestaurantIds];
      const nbRestaurantTag =
        Math.min(
          faker.datatype.number(10),
          Math.ceil(tagRestaurantIds.length / 3)
        ) + 1;
      const tagsRestaurant = [];
      for (let i = 0; i < nbRestaurantTag; i += 1) {
        const randomTagRestaurantIndex = faker.datatype.number(
          tagRestaurantIdsFree.length - 1
        );
        const tagRestaurantId = tagRestaurantIdsFree.splice(
          randomTagRestaurantIndex,
          1
        )[0];

        tagsRestaurant.push({
          tagRestaurantId,
          restaurantId,
        });
      }
      return tagsRestaurant;
    })
    .flat();
  return restaurantHasTags;
}
// Insertion des liaisons des tags de restaurant aux restaurants dans la BDD
async function insertRestaurantHasTag(restaurantHasTags) {
  await db.query(
    'TRUNCATE TABLE "restaurant_has_tag" RESTART IDENTITY CASCADE'
  );
  const restaurantHasTagValues = restaurantHasTags.map(
    (restaurantHasTag) => `(
      ${restaurantHasTag.restaurantId},
      ${restaurantHasTag.tagRestaurantId}
    )`
  );

  const queryStr = `
       INSERT INTO "restaurant_has_tag"
       (
        "restaurant_id",
        "tag_restaurant_id"
       )
       VALUES
       ${restaurantHasTagValues}
       RETURNING id
   `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des plats
async function generateMeal(nbMeal, restaurantId) {
  const meals = [];
  for (let i = 0; i < nbMeal; i += 1) {
    let name = `Steak de ${faker.animal.type()}`;
    let slug = string_to_slug(name)

    const meal = {
      name,
      slug,
      photo: faker.image.food(),
      favorite: faker.datatype.boolean(),
      review: faker.company.catchPhrase(),
      restaurant_id:
        restaurantId[
          faker.datatype.number({ min: 0, max: restaurantId.length - 1 })
        ],
    };
    meals.push(meal);
  }
  return meals;
}
// Insertion des plats générés dans la BDD
async function insertMeal(meals) {
  await db.query('TRUNCATE TABLE "meal" RESTART IDENTITY CASCADE');
  const mealValues = meals.map((meal) => {
    const newMeal = pgQuoteEscape(meal);
    return `(
               '${newMeal.name}',
               '${newMeal.slug}',
               '${newMeal.photo}',
               ${newMeal.favorite},
               '${newMeal.review}',
               ${newMeal.restaurant_id}
           )`;
  });

  const queryStr = `
           INSERT INTO "meal"
           (
               "name",
               "slug",
               "photo",
               "favorite",
               "review",
               "restaurant_id"
           )
           VALUES
           ${mealValues}
           RETURNING id
   `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des tags de plats
function generateTagMeal(nbMealTags) {
  const mealTags = [];
  for (let i = 0; i < nbMealTags; i += 1) {
    const mealTag = {
      label: faker.word.adjective(),
    };
    mealTags.push(mealTag);
  }
  return mealTags;
}
// Insertion des tags de plats générés dans la BDD
async function insertTagMeal(mealTags) {
  await db.query('TRUNCATE TABLE "tag_meal" RESTART IDENTITY CASCADE');
  const mealTagsValues = mealTags.map((mealTag) => {
    const newMealTag = pgQuoteEscape(mealTag);
    return `(
          '${newMealTag.label}'
      )`;
  });

  const queryStr = `
           INSERT INTO "tag_meal"
           (
               "label"
           )
           VALUES
           ${mealTagsValues}
           RETURNING id
   `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Liaison des tags de plat aux plats
function generateMealHasTag(mealIds, tagMealIds) {
  const mealHasTags = mealIds
    .map((mealId) => {
      const tagMealIdsFree = [...tagMealIds];
      const nbMealTag =
        Math.min(faker.datatype.number(10), Math.ceil(tagMealIds.length / 3)) +
        1;
      const tagsMeal = [];
      for (let i = 0; i < nbMealTag; i += 1) {
        const randomTagMealIndex = faker.datatype.number(
          tagMealIdsFree.length - 1
        );
        const tagMealId = tagMealIdsFree.splice(randomTagMealIndex, 1)[0];

        tagsMeal.push({
          mealId,
          tagMealId
        });
      }
      return tagsMeal;
    })
    .flat();
  return mealHasTags;
}
// Insertion des liaisons des tags de plat aux plats dans la BDD
async function insertMealHasTag(mealHasTags) {
  await db.query('TRUNCATE TABLE "meal_has_tag" RESTART IDENTITY CASCADE');
  const mealHasTagValues = mealHasTags.map((mealHasTag) => `(
      ${mealHasTag.mealId},
      ${mealHasTag.tagMealId}
    )`
  );

  const queryStr = `
       INSERT INTO "meal_has_tag"
       (
        "meal_id",
        "tag_meal_id"
       )
       VALUES
       ${mealHasTagValues}
       RETURNING id
   `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des mementos
async function generateMemento(nbMemento, restaurantId) {
  const mementos = [];
  for (let i = 0; i < nbMemento; i += 1) {
    const memento = {
      name: faker.company.catchPhrase(),
      reminder: faker.datatype.number({ min: 0, max: 2 }),
      restaurantId:
        restaurantId[
          faker.datatype.number({ min: 0, max: restaurantId.length - 1 })
        ],
    };
    mementos.push(memento);
  }
  return mementos;
}
// Insertion des mementos générés dans la BDD
async function insertMemento(mementos) {
  await db.query('TRUNCATE TABLE "memento" RESTART IDENTITY CASCADE');
  const mementoValues = mementos.map((memento) => {
    const newMemento = pgQuoteEscape(memento);
    return `(
               '${newMemento.name}',
               ${newMemento.reminder},
               ${newMemento.restaurantId}
           )`;
  });

  const queryStr = `
           INSERT INTO "memento"
           (
               "name",
               "reminder",
               "restaurant_id"
           )
           VALUES
           ${mementoValues}
           RETURNING id
   `;
  const result = await db.query(queryStr);
  return result.rows;
}

(async () => {
  /**
   * Générations d'utilisateurs fake
   * Ajout de ces utilisateurs en BDD
   */
  const users = generateUsers(NB_USERS);
  const insertedUsers = await insertUsers(users);
  debug(`${insertedUsers.length} users inserted`);
  const userIds = insertedUsers.map((user) => user.id);

  /**
   * Génération des restaurants fake
   * Ajout de ces restaurants dans la BDD
   */
  const restaurants = await generateRestaurant(NB_RESTAURANTS, userIds);
  const insertedRestaurants = await insertRestaurant(restaurants);
  debug(`${insertedRestaurants.length} restaurants inserted`);
  const restaurantIds = insertedRestaurants.map((restaurant) => restaurant.id);

  /**
   * Génération des tags restaurant fake
   * Ajout de ces tags restaurant en BDD
   */
  const tagsRestaurant = generateTagRestaurant(NB_RESTAURANTS_TAGS);
  const insertedTagRestaurant = await insertTagRestaurant(tagsRestaurant);
  debug(`${insertedTagRestaurant.length} tag_restaurant inserted`);
  const tagsRestaurantIds = insertedTagRestaurant.map(
    (tagRestaurant) => tagRestaurant.id
  );

  /**
   * Association des restaurants et des tags restaurant
   * Ajout de ces associations en BDD
   */
  const restaurantHasTags = generateRestaurantHasTag(restaurantIds,tagsRestaurantIds);
  const insertedRestaurantHasTags = await insertRestaurantHasTag(restaurantHasTags);
  debug(`${insertedRestaurantHasTags.length} restaurant <> tag_restaurant association inserted`);

  /**
   * Génération des plats fake
   * Ajout de ces restaurants dans la BDD
   */
  const meals = await generateMeal(NB_MEAL, restaurantIds);
  const insertedMeals = await insertMeal(meals);
  debug(`${insertedMeals.length} meals inserted`);
  const mealIds = insertedMeals.map((meal) => meal.id);

  /**
   * Génération des tags meal fake
   * Ajout de ces tags meal en BDD
   */
  const tagsMeal = generateTagMeal(NB_MEAL_TAGS);
  const insertedTagMeal = await insertTagMeal(tagsMeal);
  debug(`${insertedTagMeal.length} tag_meal inserted`);
  const tagsMealIds = insertedTagMeal.map((tagMeal) => tagMeal.id);

  /**
   * Association des meals et des tags meals
   * Ajout de ces associations en BDD
   */
  const mealHasTags = generateMealHasTag(mealIds, tagsMealIds);
  const insertedMealHasTags = await insertMealHasTag(mealHasTags);
  debug(`${insertedMealHasTags.length} meal <> tag_meal association inserted`);

  /**
   * Génération des mementos fake
   * Ajout de ces mementos en BDD
   */
  const mementos = await generateMemento(NB_MEMENTOS, restaurantIds);
  const insertedMemento = await insertMemento(mementos);
  debug(`${insertedMemento.length} tag_meal inserted`);

  db.originalClient.end();

})();