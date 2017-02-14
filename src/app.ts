import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as lightsRouter from './routes/api/lights/lights';

let app = express();

// view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/lights', lightsRouter);

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