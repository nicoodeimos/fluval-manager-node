import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as apiLights from './routes/api/lights';
import * as passport from "passport";
import * as fs from "fs";
import * as sha256 from "sha256";
import {BasicStrategy} from "passport-http";

let app = express();

// view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// authentication
passport.use(new BasicStrategy(
	function(username, password, done) {
		fs.readFile(path.join(__dirname, '../user'), 'utf8', function (err, data) {
			if (err) return done(err);
			if (!data) done(null, false);
			let concat = sha256(username + ':' + password);
			return done(null, concat == data);
		});
	}
));

// routes
app.all('/api/*', passport.authenticate('basic', { session: false }));
app.use('/api/lights', apiLights);

// errors
app.use(function(request, response, next) {
    let error: { status?: number } = new Error('Not Found');
 	error.status = 404;
  	next(error);
});

app.use(function(error, request, response, next) {
  	response.locals.message = error.message;
  	response.locals.error = request.app.get('env') === 'development' ? error : {};
  	response.status(error.status || 500);
  	response.render('error');
});

export = app