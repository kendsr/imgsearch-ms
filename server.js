var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	logger = require('morgan'),
	favicon = require('serve-favicon'),
	Search = require('bing.search'),
	dbURL = process.env.DATABASEURL || "mongodb://localhost/imgsearch_app";
	port = process.env.PORT || 3000,
	title = "Image Search";

require('dotenv').config({silent:true});

// Set template enjine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

// Recents Model
var RecentSchema = new mongoose.Schema({
		searchTerm: String,
		date: String       
    });
var Recent = mongoose.model("Recent", RecentSchema);

// Connect to database
mongoose.connect(dbURL);

// Landing Page 
app.get("/", function(req, res){
	res.render("landing", {title:title});
});

app.get("/api/imagesearch/:searchTerm", function(req, res){
	var searchQuery = req.params.searchTerm;
	var offset = req.query.offset || 0;
	var recentObj = {"searchTerm": searchQuery, "date": new Date().toLocaleString()};
	saveSearch(recentObj);
	var resObj = [];
	search = new Search(process.env.API_KEY);
	search.images(searchQuery,
  		{top: 5, skip: offset},
  		function(err, results) {
  			if (err) throw err;
    		results.forEach(function(result){
    			resObj.push({"title":result.title , "url":result.url, "thumbnail":result.thumbnail.url, 
    				"source":result.sourceUrl });
    		});	
    		res.json(resObj);
    	}
	);
});

app.get("/api/latest/imagesearch", function(req, res){
	console.log('got latest');
	Recent.find({},{searchTerm:1, date:1, _id:0},
			{ "sort":{ date: -1}, "limit": 10, }, 
			function(err, result){
				if (err) throw err;
				res.json(result);
			});
});

function saveSearch(recentObj) {
	Recent.create(recentObj, function(err, newrecent){
		if (err){ console.log(err); res.redirect("/");}
		console.log("Saved search - " + newrecent);
	});
}

// Server Start Up
app.listen(port, function(){
	console.log("Server is listening to port "+port);
});