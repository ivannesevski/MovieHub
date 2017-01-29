var express = require('express');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var session = require('express-session');

var movies = require('./routes/movie-routes');

var app = express();
nunjucks.configure('views', { autoescape: true, express: app });

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'abc123xyz', resave: false, saveUninitialized: false}));

// Expose session variables to views
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.get('/', function (req, res) {
  if (req.session.username && req.session.is_admin) {
    res.render('adminHome.html');
  }
  else if (req.session.username) {
    res.render('homepage.html');
  }
  else {
    res.render('login.html');
  }
});

app.get('/signup', movies.goToSignup);
app.get('/homepage', movies.goToHomepage);
app.get('/adminhome', movies.goToAdminHome);
app.get('/profile', movies.goToProfile);
app.get('/mymovies', movies.goToMyMovies);

app.post('/addmovie', movies.addMovie);
app.post('/adduser', movies.addUser);
app.post('/login', movies.login);
app.post('/signup', movies.signup);
app.post('/addlist/:title', movies.addToList);
app.post('/removelist/:title', movies.removeFromList);
app.post('/recommend/:title', movies.recommendMovie);
app.post('/notrecommend/:title', movies.notRecommendMovie);
app.post('/updatepassword', movies.updatePassword);
app.post('/updategeneral', movies.updateGeneral);
app.post('/updateprivacy', movies.updatePrivacy);

app.get('/movie/:title', movies.findMovie);
app.get('/allmovies', movies.findAllMovies);
app.get('/profiledata', movies.findProfile);
app.get('/movielist', movies.findList);
app.get('/signout', movies.signout);

// Start the server
app.listen(3000);
console.log('Listening on port 3000');