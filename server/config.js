var mongoose = require('mongoose'),
	bluebird = require('bluebird'),
	express = require('express'),
	expressSession = require('express-session'),
	app;

mongoose.Promise = bluebird;
app = express();
app.use(expressSession({secret: "temp-secret"}));

module.exports = {
	mongoose: mongoose,
	app: app
};