const jwt = require('jsonwebtoken');
const User = require('../models/user');
const client = require('../db/pg');

const controllerUser = {
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
                    await client.query(
                        'UPDATE public."user" SET token=$1 WHERE id=$2 RETURNING *',
                        [token, user.id]
                    );
                    res.status(200).json({ token , username :user.username});
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
    
    async doSignUp(req, res) {
        try {
            const user = await User.findUserByEmail(req.body.email);
            if(user){
                res.status(401).json({message: `L'utilisateur ${req.body.email} existe déjà`});
            }
            else{
                const newUser = await User.create(req.body.username, req.body.password, req.body.email);
                res.json({isLogged: true, newUser: newUser.username});
            }
        } catch (err) {
            console.error(err);
            res.send(err.message).status(401);
        }
    }
}
module.exports = controllerUser;