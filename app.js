var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var mongoDB = 'mongodb://localhost:27017/test1';
mongoose.connect(mongoDB, { useNewUrlParser: true })
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  console.log('Connected to ' + mongoDB);
  // we're connected!
  var http = require('http');
  var https = require('https');

  var indexRouter = require('./routes/index');
  var aboutRouter = require('./routes/about');
  var addRouter = require('./routes/add');

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'assets')));
  app.use(express.static(path.join(__dirname, 'node_modules')));


  app.use('/', indexRouter);
  app.use('/about', aboutRouter);
  app.use('/add', addRouter);

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

  // server start config
  var port = 8083;
  var portSSL = 8445;

  const options = {
    //key: fs.readFileSync("../certs/mam.iotamixer.io/privkey.pem"),
    //cert: fs.readFileSync("../certs/mam.iotamixer.io/fullchain.pem"),
    requestCert: false,
    rejectUnauthorized: false
  };

  var httpServer = http.createServer(app);
  var httpsServer = https.createServer(options, app);

  httpServer.listen(port);
  httpsServer.listen(portSSL);
});
