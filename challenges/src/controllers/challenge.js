var http = require('http');
var request = require('request');

var IGN_URL = "http://ign-apis.herokuapp.com";

var introductionPage = function(req, res){
	res.render('introduction', {
		title: "Intruduction",
		subtitle: "Get to know a bit about me",
		nextButton: {
			link: "/pingpong",
			title: "Ping Pong"
		}
	});
};

var pingpongPage = function(req, res){
	res.render('pingpong', {
		title: "Ping Pong Challenge",
		subtitle: "How many ping-pong balls can fit in a Boeing 747?",
		prevButton: {
			link: "/",
			title: "Intruduction"
		},
		nextButton: {
			link: "/wordsearch",
			title: "Word Search"
		}
	});
};

var wordsearchPage = function(req, res){
	res.render('wordsearch', {
		title: "Word Search Challenge",
		subtitle: "Find the words in the word search",
		prevButton: {
			link: "/pingpong",
			title: "Ping Pong"
		},
		nextButton: {
			link: "/api-part1",
			title: "API Part 1"
		}
	});
};

var apiPart1Page = function(req, res){
	
	request(IGN_URL+"/articles", function (error, response, data) {
		if (!error && response.statusCode == 200) {
			var articles = JSON.parse(data);
			
			request(IGN_URL+"/videos", function (error, response, data) {
				if (!error && response.statusCode == 200) {
					var videos = JSON.parse(data);
					
					res.render('apiPart1', {
						title: "API Challenge - Part 1",
						subtitle: "Fetch the articles and videos",
						prevButton: {
							link: "/wordsearch",
							title: "Word Search"
						},
						nextButton: {
							link: "/api-part2",
							title: "API Part 2"
						},
						content: {
							articles: articles,
							videos: videos
						}
					});	
				}
			});
			
			
		}
	});
};

var apiPart2Page = function(req, res){
	request(IGN_URL+"/articles", function (error, response, data) {
		if (!error && response.statusCode == 200) {
			var articles = JSON.parse(data);
			
			request(IGN_URL+"/videos", function (error, response, data) {
				if (!error && response.statusCode == 200) {
					var videos = JSON.parse(data);
					
					res.render('apiPart2', {
						title: "API Challenge - Part 2",
						subtitle: "Make it pretty",
						prevButton: {
							link: "/api-part2",
							title: "API Part 1"
						},
						content: {
							articles: articles,
							videos: videos
						}
					});	
				}
			});
			
			
		}
	});
};

module.exports.introductionPage = introductionPage;
module.exports.pingpongPage = pingpongPage;
module.exports.wordsearchPage = wordsearchPage;
module.exports.apiPart1Page = apiPart1Page;
module.exports.apiPart2Page = apiPart2Page;