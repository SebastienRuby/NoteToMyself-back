require('dotenv').config();
const fileUpload = require('express-fileupload');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./app/router/index');

const PORT = process.env.PORT || 8080;

const app = express();

/** ********* */
/*  SWAGGER */
/** ******** */
const expressJSDocSwagger = require("express-jsdoc-swagger");

const options = {
    info: {
        version: "1.0.0",
        title: "API Documentation",
        license: {
            name: "MIT",
        },
    },
    security: {
        BasicAuth: {
            type: "http",
            scheme: "basic",
        },
        BearerAuth: {
            type: "http",
            scheme: "bearer"
        }
    },
    swaggerUIPath: "/docs", // url où se trouve la doc
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: "./app/router/*.js",
    exposeSwaggerUI: true // Expose OpenAPI UI

};
expressJSDocSwagger(app)(options);

app.use(fileUpload());

// app.use(express.static(path.join(__dirname, './assets')));
app.use('/', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

// on rajoute à la gestion des POST -> body
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
