var express = require('express');
var router = express.Router();
var store = require('../store');
var model = require("../models");
// var User = require("../models").User;

/* GET home page. */
router.get('/', function(req, res) {
	model.Tweet.findAll({include: [ model.User ] }).success(function(tweets){
		var queryResults = [];
		for (var i = 0; i < tweets.length; i++){
			queryResults.push({text: tweets[i].tweet, name: tweets[i].User.name, id: tweets[i].id});
		}
		res.render('index', {
			title: 'Twitter.js Awesome stuff',
			tweets: queryResults,
			show_form: true
		});

	})
});





router.get('/users/:name', function(req, res) {
  var name = req.params.name;

	model.User.find({
		where: {name: name}, include: [model.Tweet]
	}).success(function(user){

				var queryResults = [];

				for (var i = 0; i < user.Tweets.length; i++){
					queryResults.push({text: user.Tweets[i].tweet, name: user.name, id: user.id});
				}

				res.render('index', {
					title: 'Twitter.js Awesome stuff',
					tweets: queryResults,
					show_form: true,
					username: name
				});
	})


});


router.get('/users/:name/tweets/:id', function(req, res) {
	var name = req.params.name;
	var tweetId = Number(req.params.id);




	model.Tweet.find({
		where: {id: tweetId}, include: [model.User]
	}).success(function(tweet){


				var queryResults = [];
				queryResults.push({text: tweet.tweet, name: tweet.User.name, id: tweet.id});

				res.render('index', { title: 'Twitters.js - A single tweet by '+ name, tweets: queryResults});
	})

})

module.exports = router;
