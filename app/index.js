const express = require('express');
const app = express();



/* Middlewares */
// parse request body
app.use(bodyParser.json());
​
// Router
const {getRouter,postRouter} = require("./router")

app.use(getRouter);

app.use(express.json());

app.use(postRouter);

module.exports = app;