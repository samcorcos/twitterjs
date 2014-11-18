var express = require('express');
var router = express.Router();
var store = require('../store');
var model = require("../models");


/* GET home page. */
router.get('/', function(req, res) {
	var results = model.Tweet.findAll({include: [ model.User ] }).success(function(tweets){


		var queryResults = [];

		for (var i = 0; i < tweets.length; i++){
			queryResults.push({text: tweets[i].Tweet, name: tweets[i].User, id: tweets[i].id});
		}

		return queryResults;

	})

	res.render('index', {
		title: 'Twitter.js Awesome stuff',
		tweets: results,
		show_form: true
	});
});


router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = store.find({name: name});

  res.render('index', {
  	title: 'Twitter.js - Posts by '+name,
  	tweets: list,
  	show_form: true,
  	username: name
  });
});

router.get('/users/:name/tweets/:id', function(req, res) {
	var name = req.params.name;
	var tweetId = Number(req.params.id);
	var list = store.find({id: tweetId});

	res.render('index', { title: 'Twitters.js - A single tweet by '+name, tweets: list })
})

module.exports = router;

// This is where everything is going to change

// Tweet.findAll({include: [ User ] }).success(function(tweets){
// 	console.log(JSON.stringify(tweets[0]))
// })
