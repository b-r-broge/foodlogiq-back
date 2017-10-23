// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Environment variables, setup with heroku/localhost
const env = process.env.NODE_ENV || "dev";
const url = process.env.MONGOLAB_URI || "mongodb://localhost:27017/draynori" + env;
const secret = process.env.SECRET || "This is the session secret!";

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

app.listen(process.env.PORT || 3000);
console.log('application listening.');
