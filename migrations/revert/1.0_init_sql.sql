-- Revert note_to_my_self:1.0_init_sql from pg

BEGIN;

DROP TABLE IF EXISTS 
"user",
"restaurant",
"memento",
"restaurant_has_tag",
"tag_restaurant",
"meal",
"meal_has_tag",
"tag_meal",

COMMIT;
