const express = require('express');
const bodyParser = require('body-parser');
const service = require('./service');
const app = express();
const routes = require('./route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes)

new service().createTable();

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
  });

module.exports = app; 
