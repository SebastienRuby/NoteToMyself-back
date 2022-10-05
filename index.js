require('dotenv').config();
const path = require('path');
const fileUpload = require('express-fileupload');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./app/router/router');
const expressJSDocSwagger = require("express-jsdoc-swagger");

const PORT = process.env.PORT || 8080;

const app = express();

const options = {
  info: {
      version: "1.0.0",
      title: "NoteToMyself",
      license: {
          name: "MIT",
      },
  },
  security: {
      BasicAuth: {
          type: "http",
          scheme: "basic",
      },
  },
  swaggerUIPath: "/tata&toto", // url où se trouve la doc
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
};
expressJSDocSwagger(app)(options);


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
