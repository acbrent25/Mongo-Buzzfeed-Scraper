// mongo url on heroku
// mongodb://heroku_chk885ch:uq9pd7oc2iu70kdls0tk5a2vjb@ds127936.mlab.com:27936/heroku_chk885ch

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require('request');
var axios = require("axios");
var cheerio = require("cheerio");

// require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended:false }));

// use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// set mongoose to use ES6 Promis library and Connect to mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoBuzzfeedScraper", {
    useMongoClient: true
});









// start server
app.listen(PORT, function(){
    console.log("App is running on port" + PORT + "!");
})
