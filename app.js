// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Environment variables, setup with heroku/localhost
const env = process.env.NODE_ENV || "dev";
const url = process.env.MONGOLAB_URI || "mongodb://localhost:27017/foodlogiq" + env;

// Setup Express App
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Setup Mongoose
mongoose.Promise = require('bluebird');
mongoose.connect(url, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to mongo datastore');
 }
});

// Enable cors so the react app can interact remotely
app.use(cors());

// API routes
const contentRoute = require('./routes/content');

app.use('/api', contentRoute);

// Listen, and setup for working with the test suite
app.set('port', (process.env.PORT || 3000));
if (require.main === module) {
  app.listen(app.get('port'), function () {
    console.log("Server running at http://localhost:3000")
  })
}

module.exports = app;
