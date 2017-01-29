var Movie = require('../models/moviehub.js');
var User = require('../models/user.js');

exports.goToSignup = function(req, res) {
  res.render("signup.html");
};

exports.goToHomepage = function(req, res) {
  res.render("homepage.html");
};

exports.goToAdminHome = function(req, res) {
  res.render("homepageAdmin.html");
};

exports.goToProfile = function(req, res) {
  res.render("profile.html");
};

exports.goToMyMovies = function(req, res) {
  res.render("mymovies.html");
};

/**
 * Adds a movie to the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.addMovie = function(req, res) {
  var reqTitle = req.body.title;
  
  Movie.findOne({title: reqTitle}, function(err, movie) {
    if (err) {
      throw err;
    }
    
    if (movie) {
      res.send({error: "That movie is already in the database!"});
    }
    else {
      req.body.title = req.body.title.toLowerCase();
      var newMovie = new Movie(req.body);

      newMovie.save(function(err, newUser) {
        if (err) { 
          throw err;
        }
        
        res.send({error: ""});
      });
    }
    
  });
};

/**
 * Adds a user to the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.addUser = function(req, res) {
  var reqUsername = req.body.username;
  var reqPassword = req.body.password;
  
  User.findOne({username: reqUsername}, function(err, user) {
    if (err) {
      throw err;
    }
    
    if (user) {
      res.send({error: "That user is already in the database!"});
    }
    else {
      var newUser = new User(req.body);
      
      newUser.save(function(err, newUser) {
        if (err) { 
          throw err;
        }
       
        res.send({error: ""});
      });
    }
    
  });
};

/**
 * Logs the user in.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.login = function(req, res) {
  var reqUsername = req.body.username;
  var reqPassword = req.body.password;
  
  User.findOne({username: reqUsername}, function(err, user) {
    if (err) {
      throw err;
    }
    
    if (user && user.password == reqPassword) {
      req.session.username = user.username;
      req.session.is_admin = user.isAdmin;
      
      if (req.session.is_admin) {
        res.redirect('/adminhome');
      }
      else {
        res.redirect('/homepage');
      }
    }
    else {
      res.render("login.html", {error: "Invalid username or password"});
    }
  });
};

/**
 * Adds a user to the database when they signup.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.signup = function(req, res) {
  var reqUsername = req.body.username;
  var reqPassword = req.body.password;
  var password_confirmation = req.body.password_confirmation;
  
  if (reqPassword != password_confirmation) {
    res.render("signup.html", {confirm_err: "Passwords do not match."});
  } 
  else {
    User.findOne({username: reqUsername}, function(err, user) {
      if (err) {
        throw err;
      }
      
      if (user) {
        res.render("signup.html", {username_err: "That username is taken."});
      }
      else {
        var newUser = new User({username: reqUsername, password: reqPassword});
        
        newUser.save(function(err, newUser) {
          if (err) { 
            throw err;
          }
          
          req.session.username = reqUsername;
          res.redirect("/homepage");
        });
      }
      
    });
  }
};

/**
 * Adds a movie to the current users' movie list.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.addToList = function(req, res) {
  var reqTitle = req.params.title;
  
  User.findOne({username: req.session.username}, function(err, user) {
    if (err) {
      throw err;
    }
    
    if (user.movieList.indexOf(reqTitle) > -1) {
      res.send({error: "This movie is already in your movies!"});
    }
    else {
      user.movieList.push(reqTitle);
      
      user.save(function(err, user) {
        if (err) {
          throw err;
        }
        
        res.send({error: ""});
      });      
    }
  });
};

/**
 * Removes a movie from the current users' movie list.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.removeFromList = function(req, res) {
  var reqTitle = req.params.title;
  
  User.findOne({username: req.session.username}, function(err, user) {
    if (err) {
      throw err;
    }
    
    var index = user.movieList.indexOf(reqTitle);  
    user.movieList.splice(index, 1);
    
    user.save(function(err, user) {
      if (err) {
        throw err;
      }
      
      res.send("Success");
    });         
  });
};

/**
 * Increases recommends on a movie.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.recommendMovie = function(req, res) {
  var reqTitle = req.params.title;
  
  Movie.findOne({title: reqTitle}, function(err, movie) {
    if (err) {
      throw err;
    }
      
    movie.likes += 1;
    
    movie.save(function(err, movie) {
      if (err) {
        throw err;
      }
      
      res.send("Success");
    });         
  });
};

/**
 * Increases not-recommends (dislikes) on a movie.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.notRecommendMovie = function(req, res) {
  var reqTitle = req.params.title;
  
  Movie.findOne({title: reqTitle}, function(err, movie) {
    if (err) {
      throw err;
    }
      
    movie.dislikes += 1;
    
    movie.save(function(err, movie) {
      if (err) {
        throw err;
      }
      
      res.send("Success");
    });         
  });
};

/**
 * Finds a movie in the database given its title.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.findMovie = function(req, res) {
  var reqTitle = req.params.title.toLowerCase();

  Movie.findOne({title: reqTitle}, function(err, movie) {
    if (err) {
      throw err;
    }
    
    res.json(movie);
  });
};

/**
 * Finds all movies in the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.findAllMovies = function(req, res) {
  Movie.find({}, function(err, movies) {
    if (err) {
      throw err;
    }
    
    res.send(movies);
  });
};

/**
 * Finds the current users profile in the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.findProfile = function(req, res) {
  User.findOne({username: req.session.username}, function(err, user) {
    if (err) {
      throw err;
    }
    
    res.json(user);
  });
};

/**
 * Updates the current users' password.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.updatePassword = function(req, res) {
  var reqOldPassword = req.body.oldPassword;
  var reqNewPassword = req.body.newPassword;
  
  User.findOne({username: req.session.username}, function(err, user) {
    if (err) {
      throw err;
    }
    
    if (reqOldPassword != user.password) {
      res.send({error: "Invalid password"});
    }
    else {
      user.password = reqNewPassword;
      
      user.save(function(err, user) {
        if (err) {
          throw err;
        }
        
        res.send({error: ""});
      });
    }
  });
};

/**
 * Updates the current users' general info.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.updateGeneral = function(req, res) {
  var reqFirstName = req.body.firstName;
  var reqLastName = req.body.lastName;
  var reqGender = req.body.gender;
  var reqDoB = req.body.DoB;
  var reqAbout = req.body.about;
  
  User.findOne({username: req.session.username}, function(err, user) {
    if (err) {
      throw err;
    }
    
    user.firstName = reqFirstName;
    user.lastName = reqLastName;
    user.gender = reqGender;
    user.DoB = reqDoB;
    user.about= reqAbout;
    
    user.save(function(err, user) {
      if (err) {
        throw err;
      }
      
      res.redirect("/profile");
    });
  });
};

/**
 * Updates the current users' privacy settings.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.updatePrivacy = function(req, res) {
  var reqPrivate = req.body.private;
  
  User.findOne({username: req.session.username}, function(err, user) {
    if (err) {
      throw err;
    }
    
    user.private = reqPrivate;
    
    user.save(function(err, user) {
      if (err) {
        throw err;
      }
      
      res.redirect("/profile");
    });
  });
};

/**
 * Finds the current users movie list in the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.findList = function(req, res) {
  User.findOne({username: req.session.username}, function(err, user) {
    if (err) {
      throw err;
    }
    
    res.json(user.movieList);
  });
};

exports.signout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};


