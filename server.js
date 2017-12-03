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

/***************
     Routes
 ***************/

 // GET route for scraping

 app.get("/scrape", function(req, res){
     axios.get("https://www.buzzfeed.com/news").then(function(response){
        var $ = cheerio.load(response.data);

        $(".xs-px05").each(function(i, element){
            var result = {};
            result.title = $(this).find("h2").text();
            // console.log(result.title);
            result.link = "https://www.buzzfeed.com" + $(this).find("a").attr("href");
            console.log(result.link);

            db.Article
            .create(result)
            .then(function(dbArticle) {
              // If we were able to successfully scrape and save an Article, send a message to the client
              res.send("Scrape Complete");
            })
            .catch(function(err) {
              // If an error occurred, send it to the client
              res.json(err);
            });
        });
     }); // axios.get
 }); // app.get

 // Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article
    .find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });






// start server
app.listen(PORT, function(){
    console.log("App is running on port" + PORT + "!");
})
