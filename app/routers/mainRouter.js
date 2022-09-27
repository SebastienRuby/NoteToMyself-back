// on récupère le module Router de express
const { Router } =  require("express");
const router = Router();    

// on récupère le controller
const authController = require("../controllers/authController");


// On crée la route / qui renvoie un message
router.get('/', (req, res) => {
    res.send('Hello World!')
  })

router.post('/login', authController.postLogin);

module.exports=router;