const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const controllerTag = require('../controllers/controllerTag');

/** POST /tag/restaurant
 * @summary Créer un tag pour un restaurant
 * @tags TAG RESTAURANT
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - response
 * {
 * "message": "Tag créé"
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 * 
 */
 
 /** DELETE /tag/restaurant
 * @summary Supprime un tag pour un restaurant
 * @tags TAG RESTAURANT
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - response
 * {
 * "message": "Tag supprimé"
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 * 
 */
router.post('/tag/restaurant', authMiddleware.checkToken, controllerTag.createTagRestaurant);
router.delete('/tag/restaurant', authMiddleware.checkToken, controllerTag.deleteTagRestaurant);

module.exports = router;