const User = require('../models/user');

const controllerUser = {
    async doLogin(req, res) {
        try {
            const user = await User.findUserByEmail(req.body.email);
            if(req.session.user === user && user.checkPassword(req.body.password)){
                res.json({isLogged: true, user: req.session.user});
            }
            else{
                res.json({isLogged: false, user: null});
            }
        } catch (err) {
            console.error(err);
            res.send(err.message).status(401);
        }
    },
    async doSignUp(req, res) {
        try {
            const user = await User.findUserByEmail(req.body.email);
            if(user){
                res.status(401).json({message: `L'utilisateur ${req.body.email} existe déjà`});
            }
            else{
                const newUser = await User.create(req.body.username, req.body.password, req.body.email);
                newUser = req.session.user;
                res.json({isLogged: true, user: req.session.user});
            }
        } catch (err) {
            console.error(err);
            res.send(err.message).status(401);
        }
    }
}
module.exports = controllerUser;