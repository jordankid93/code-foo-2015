var controllers = require('./controllers');

var setupRoutes = function(app){

	// Static Page Handling
	app.get('/', controllers.Challenge.introductionPage);
	app.get('/pingpong', controllers.Challenge.pingpongPage);
	app.get('/wordSearch', controllers.Challenge.wordsearchPage);
	app.get('/api-part1', controllers.Challenge.apiPart1Page);
	app.get('/api-part2', controllers.Challenge.apiPart2Page);

	// 404 Handling
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
};

module.exports.setupRoutes = setupRoutes;