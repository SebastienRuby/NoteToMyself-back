const User = require('./user');
const Restaurant = require('./restaurant');
const TagRestaurant = require('./tagRestaurant');
const Meal = require('./meal')
const TagMeal = require('./tagMeal')
const Mementos = require('./memento')

// Un user a plusieurs restaurants
User.hasMany(Restaurant, {
    foreignKey: 'user_id',
    as: 'restaurants'
});
// reciproque : un restaurant est lié à un seul user
Restaurant.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Un restaurant a plusieurs plats
Restaurant.hasMany(Meal, {
    foreignKey: 'restaurant_id',
    as: 'meals'
});
// reciproque : un plat est lié à un seul restaurant
Meal.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id',
    as: 'restaurant'
});

// Restaurant <> TagRestaurant, via la table de liaison
// Un restaurant possède plusieurs tags
Restaurant.belongsTo(TagRestaurant, {
    as: "tagsRestaurant",
    through: "restaurant_has_tag",
    foreignKey: "restaurant_id",
    otherKey: "tag_id"
});
// Reciproque :
TagRestaurant.belongsTo(Restaurant, {
    as: "restaurants",
    through: "restaurant_has_tag",
    foreignKey: "tag_id",
    otherKey: "restaurant_id"
});

// Meal <> TagMeal, via la table de liaison
// Un meal possède plusieurs tags
Meal.belongsTo(TagMeal, {
    as: "tagsMeal",
    through: "meal_has_tag",
    foreignKey: "meal_id",
    otherKey: "tag_id"
});

// Reciproque :
TagMeal.belongsTo(Meal, {
    as: "meals",
    through: "meal_has_tag",
    foreignKey: "tag_id",
    otherKey: "meal_id"
});

// Un restaurant possède plusieurs mementos
Restaurant.hasMany(Mementos, {
    foreignKey: 'restaurant_id',
    as: 'mementos'
});
// reciproque : un memento est lié à un seul restaurant
Mementos.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id',
    as: 'restaurant'
});
