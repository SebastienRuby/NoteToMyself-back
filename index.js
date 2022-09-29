require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./app/router/router');
const session = require('express-session');
const userMiddleware = require('./app/middleware/userMiddleware');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, './assets')));

// on rajoute à la gestion des POST -> body
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));

app.use(session({
  saveUninitialized: true, // Je crée une session vide même si l'utilisateur n'est pas connecté
  resave: true, // Je ré-enregistre les cookies à chaque requête
  secret: process.env.SESSION_SECRET || 'Change Me!',
}));


app.use(userMiddleware);

app.use(router);

app.listen(PORT, _ => {
  console.log('http://sebastienruby-server.eddi.cloud');
});
