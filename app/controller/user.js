const client = require('../db/pg');
const jwt = require('express-jwt');

const user = {
    async authentificationLogin (req, res){
    const userLogin = client.user.find(user => user.id === req.user.userId && password.id === req.password.userId);
    if (!userLogin) {
        return res.status(401).json({ message: 'User not found' });
        }
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
    redirect('/acceuil');
    }, 
}
   
module.exports = user;