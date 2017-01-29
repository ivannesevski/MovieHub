/**
 * Submit handler for the adding a movie form.
 *
 * @param {object} click event
 */
function submitMovieHandler(evt) {
  evt.preventDefault();
  
  let formData = $('form').serialize();
  $.post('/addmovie', formData, function(res) {
    if (res['error']) {
      alert(res['error']);
    }
    else {
      alert("Movie added to database Successfuly.");
    }
  });
};

/**
 * Submit handler for the adding a user form.
 *
 * @param {object} click event
 */
function submitUserHandler(evt) {
  evt.preventDefault();
  
  let formData = $('form').serialize();
  $.post('/adduser', formData, function(res) {
    if (res['error']) {
      alert(res['error']);
    }
    else {
      alert("User added to database Successfuly.");
    }
  });
};

$(document).ready(function() {
  $('.movie-info').submit(submitMovieHandler);
  $('.user-info').submit(submitUserHandler);
});
