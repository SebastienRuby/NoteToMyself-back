/**
 * POST /api/register
 * @summary Creates a user and save it in the database
 * @security BasicAuth
 * @tags user
 * @param {newUser} request.body.required - user info
 * @return {newUser} 200 - success response - application/json
 * @return {object} 500 - Internal error
 * @example response - 200 - response
 * {
 *      "firstname": "Harleen",
 *      "lastname": "Quinzel",
 *      "nickname": "HarleyQuinn",
 *      "mail": "harleyquinn@gmail.com"
 * }
 * @example response - 500 - internal error
 * {
 *      "error": "Internal error, wrong body schema"
 * }
 */
 'ca c\'est pour les routes'

 const expressJSDocSwagger = require('express-jsdoc-swagger');

 const options = {
     info: {
         version: "1.0.0",
         title: "API Mob",
         license: {
             name: "MIT"
         },
         description: This api is directly linked to the mob (multiplayer online bracket) application. It is used to make calls to our database to create tournaments and new users  it's a school project that we realized at 5 in one month. do not hesitate to contact us if you have any ideas for improvement,
         contact: {
         name: "API Support",
         email: "mob.api.contact@gmail.com"
         }
     },
     security: {
         BasicAuth: {
             type: "http",
             scheme: "basic"
         },
         BearerAuth: {
             type: "http",
             scheme: "bearer"
         }
     },
     swaggerUIPath: "/api-docs", // URL where SwaggerUI will be rendered
     baseDir: __dirname, // Base directory which we use to locate your JSDOC files
     filesPattern: ".//*.js", // Global pattern to find our jsdoc files (multiple patterns can be added in an array)
     exposeSwaggerUI: true // Expose OpenAPI UI
 
 };
 
 expressJSDocSwagger(app)(options);
 
 /**
  * A newUser
  * @typedef {object} newUser
  * @property {string} firstname.required - The firstname
  * @property {string} lastname.required - The lastname
  * @property {string} nickname.required - The nickname
  * @property {string} mail.required - The email
  * @property {string} password.required - The password
  */
 'ca c\'est ... l\'index'

 
 /**
 * Add a new tournament in the database
 * @param {Object} tournamentTemp
 * @returns {Json} tournament
 */
'ca c\'est les models'


/**
 * @summary Get list of 15 players with max trophies 
 * @param {*} req 
 * @param {*} res 
 * @returns {array<User>} List of user with max trophies
 */
 'ca c\'est les controller'