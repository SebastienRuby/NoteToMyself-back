const express = require('express');
const router = express.Router();
const cors = require('cors')
const jwtSecret = 'Notetomyselfsecretmessage';
const authorizationMiddleware = jwt({ secret: jwtSecret, algorithms: ['HS256'] });


app.use(cors())


router.post("/login",cors,authorizationMiddleware,user.authentificationLogin);

module.exports = router;