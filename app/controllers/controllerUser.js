const jwt = require('jsonwebtoken');
const User = require('../models/user');

const controllerUser = {
    // Method: POST
    // Path: /login
    // Description: login a user
    async doLogin(req, res) {
        try {
            const user = await User.findUserByEmail(req.body.email);
            if (user) {
                if (user.checkPassword(req.body.password)) {
                    const token = jwt.sign({
                        userId: user.id,
                        username: user.username,
                        email: user.email
                        }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_DURING});
                    res.status(200).json({token: token, username: user.username, email: user.email, id:user.id});
                } else {
                    res.status(401).json({ message: 'Invalid password' });
                }
            } else {
                res.status(401).json({ message: 'Invalid email' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Method: POST
    // Path: /signup
    // Description: Create a user
    async doSignUp(req, res) {
        try {
            const user = await User.findUserByEmail(req.body.email);
            if(user){
                res.status(401).json({message: `L'utilisateur ${req.body.email} existe déjà`});
            }
            else{
                await User.create(req.body.username, req.body.password, req.body.email);                
                const newUserLogged = await User.findUserByEmail(req.body.email);
                const token = jwt.sign({
                    userId: newUserLogged.id,
                    username: newUserLogged.username,
                    email: newUserLogged.email
                    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_DURING});
                res.status(200).json({ token , username :newUserLogged.username , id: newUserLogged.id});
            }

        } catch (err) {
            console.error(err);
            res.send(err.message).status(401);
        }
    },

   async deleteUser(req, res) {
       try{
              const user = await User.findUserById(req.headers.id);
              if(user){
                await User.delete(req.headers.id);
                res.status(200).json({message: `L'utilisateur ${user.username} a été supprimé`});
              }
              else{
                res.status(401).json({message: `L'utilisateur n'existe pas`});
              }
       }
         catch(err){
            console.error(err);
            res.send(err.message).status(401);
            }
    },


    async updateUser(req, res) {
        try{
            const user = await User.findUserById(req.headers.id);
            if(user){
                await User.update(req.headers.id, req.body.username, req.body.password);
                res.status(200).json({message: `L'utilisateur ${user.username} a été modifié`});
            }
            else{
                res.status(401).json({message: `L'utilisateur n'existe pas`});
            }
        }
        catch(err){
            console.error(err);
            res.send(err.message).status(401);
        }
    }

        
}
module.exports = controllerUser;

