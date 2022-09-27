require('dotenv').config();
const express = require('express')
const app = express()
const router = require('./app/routers/mainRouter')
const session = require('express-session');
const PORT = process.env.PORT || 3000

app.use(session({
    secret: 'test', // le secret sert à générer des tokens (id de session)
    resave: true, // sauvegarder automatiquement la session
    saveUninitialized: true, // sauvegarde la session si elle est vide 
    cookie: {
        // ici on peut sauvegarder des cookies pour l'utilisateur qui aurait une session
    }
}));


//permet de recuperer le req.body sur un post
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use( (req, res) => {
    res.status(404).render('404');
 });


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`) 
})