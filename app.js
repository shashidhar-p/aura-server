var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const baseUrl = '/api';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.router');
const authRouter = require('./routes/auth.router');
const notifRouter = require('./routes/notification.router');
var eventRouter = require('./routes/event.router');
var coordsRouter = require('./routes/coord.router');
var pgRedirectRoute = require('./routes/pgredirect');
var responseRoute = require('./routes/response');
var testtxnRoute = require('./routes/testtxn');

var app = express();

//Enable CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Static Route for Uploaded Files
app.use(baseUrl + '/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(baseUrl + '/', indexRouter);
app.use(baseUrl + '/users', usersRouter);
app.use(baseUrl + '/auth', authRouter);
app.use(baseUrl + '/notifs', notifRouter);
app.use(baseUrl + '/coords', coordsRouter);
app.use(baseUrl + '/events', eventRouter);

// Init DB
const model = require("./models/index");
const models = require("./models");

// Sync Database
model.sequelize
    .sync()
    .then(function () {
        console.log("Nice! Database looks fine");
    })
    .catch(function (err) {
        console.error(err, "Something went wrong with the Database Update!");
    });

// Paytm Stuff
app.use(baseUrl + '/pgredirect', pgRedirectRoute);
app.use(baseUrl + '/response', responseRoute);
app.use(baseUrl + '/testtxn', testtxnRoute);
app.use(express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
