require('dotenv').config();
const fileUpload = require('express-fileupload');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./app/router/router');

const PORT = process.env.PORT || 8080;

const app = express();

//~ IMPORTATION SWAGGER DOCS
import { specs, serve, setup, cssOptions} from './app/swaggerDocs/swaggerDocs.js';
app.use('/api-docs', serve, setup(specs, cssOptions));


app.use(fileUpload());

// app.use(express.static(path.join(__dirname, './assets')));
app.use('/', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

// on rajoute à la gestion des POST -> body
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));
app.use(bodyParser.json());

app.use(router);

// eslint-disable-next-line
app.listen(PORT, _ => {
  console.log('Server started on port', PORT);
});
