var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var WiFiControl = require('wifi-control');

var app = express();

//  Initialize wifi-control package with verbose output
var settings = {
  debug: true || false,
  iface: 'wlan0',
  connectionTimeout: 10000 // in ms
};

WiFiControl.init({
  debug: true
});
WiFiControl.configure(settings);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/scanresult', function (req, res) {

  WiFiControl.scanForWiFi(function(err, response) {
    if (err) console.log(err);

    var networkList = response["networks"];      
    networkList.sort(function(a, b){
      return b.signal_level-a.signal_level
    });
    var values="" ;
    for (var i = 0; i < networkList.length; i++) { 
      var value = (i+1)+":: <b>Name :: </b> "+networkList[i].ssid
      +", <b>Mac :: </b> "+networkList[i].mac
      +",  <b>Strength :: </b>"+networkList[i].signal_level+"</br></br>"
      values = values.concat(value);
      console.log(values);
    }  
    res.send(values)
  });
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
