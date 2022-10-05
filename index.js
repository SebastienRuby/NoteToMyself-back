require('dotenv').config();
const path = require('path');
const fileUpload = require('express-fileupload');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./app/router/router');


const PORT = process.env.PORT || 8080;

const app = express();

app.use(fileUpload());

app.use(express.static(path.join(__dirname, './assets')));

// on rajoute à la gestion des POST -> body
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, _ => {
  console.log('Server started on port', PORT);
});
