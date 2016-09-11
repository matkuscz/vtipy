// Babel ES6/JSX Compiler
require('babel-register');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var async = require('async');
var request = require('request');
var xml2js = require('xml2js');

var _ = require('underscore');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var config = require('./config');

var mongoose = require('mongoose');
var Joke = require('./models/joke');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * GET /api/jokes/:id
 * Returns joke.
 */
app.get('/api/jokes/:id', function(req, res, next) {
  var id = req.params.id;

  Joke.findOne({ jokeId: id }, function(err, joke) {
    if (err) return next(err);

    if (!joke) {
      return res.status(404).send({ message: 'Joke not found.' });
    }

    res.send(joke);
  });
});

/**
 * POST /api/report
 * Reports a joke. Joke is removed after 4 reports.
 */
app.post('/api/report', function(req, res, next) {
  var jokeId = req.body.jokeId;

  Joke.findOne({ jokeId: jokeId }, function(err, joke) {
    if (err) return next(err);

    if (!joke) {
      return res.status(404).send({ message: 'Joke not found.' });
    }

    joke.reports++;

    if (joke.reports > 4) {
      joke.remove();
      return res.send({ message: joke.name + ' has been deleted.' });
    }

    joke.save(function(err) {
      if (err) return next(err);
      res.send({ message: joke.name + ' has been reported.' });
    });
  });
});

/**
 * GET /api/jokes/top
 * Return 10 jokes.
 */
app.get('/api/top', function (req, res, next) {
  Joke.find().limit(10).exec(function(err, jokes) {
    res.send(jokes);
  });
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
