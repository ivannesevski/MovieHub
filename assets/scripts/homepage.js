/**
 * Builds a movie list item.
 *
 * @param {string} movie title
 */
function buildMovieList(movie) {
  // creating html elements
  let movie_container = $('<li></li>').addClass("movie");
  let movie_info = $('<div></div>').addClass("movie-info");
  
  let movie_title = $('<h2></h2>').addClass("movie-title no-margin").text(movie.title);
  let movie_year = $('<span></span>').text("(" + movie.year + ")");
  
  let movie_data = $('<div></div>');
  let movie_rating = $('<span></span>').text(movie.rating);
  let separator1 = $('<span></span>').text(" | ");
  let movie_length = $('<span></span>').text(movie.length + " mins");
  let separator2 = $('<span></span>').text(" | ");
  let movie_genre = $('<span></span>').text(movie.genre);
  
  let director = $('<p></p>').text("Director: " + movie.director);
  let stars = $('<p></p>').text("Stars: " + movie.stars);
  
  let movie_controls = $('<div></div>').addClass("movie-controls");
  
  let add_btn = $('<button></button>').addClass("add-btn").text("Add to your movies");
  
  // add button click event
  add_btn.click(function(){
    $.post("/addlist/" + movie.title, function(res) {
      if (res['error']) {
        alert(res['error']);
      }
      else {
        alert("Added successfully.");
      }
    });
  });
  
  let recommended = $('<p></p>').text("Recommended by: ");
  let movie_likes = $('<b></b>').addClass("likes").text(movie.likes);
  
  let not_recommended = $('<p></p>').text("Not recommended by: ");
  let movie_dislikes = $('<b></b>').addClass("dislikes").text(movie.dislikes);
 
  // putting elements together
  movie_data.append(movie_rating);
  movie_data.append(separator1);
  movie_data.append(movie_length);
  movie_data.append(separator2);
  movie_data.append(movie_genre);
  
  movie_info.append(movie_title);
  movie_info.append(movie_year);
  movie_info.append(movie_data);
  movie_info.append(director);
  movie_info.append(stars);
  
  recommended.append(movie_likes);
  not_recommended.append(movie_dislikes);
  
  movie_controls.append(add_btn);
  movie_controls.append(recommended);
  movie_controls.append(not_recommended);
  
  movie_container.append(movie_info);
  movie_container.append(movie_controls);
  
  $('.movie-list').append(movie_container);
};

/**
 * Submit handler for search form.
 *
 * @param {object} click event
 */
function submitHandler(evt) {
  evt.preventDefault();
  $('.movie-list').empty();
  
  let title = $('input[name=title]').val();
  
  if (title == "") {
    $('.movie-list').css("display", "none");
    $('.not-found').css("display", "block");
  }
  else {
    $.get("/movie/" + title, function(movie) {
      if (movie) {
        buildMovieList(movie);
        $('.not-found').css("display", "none");
        $('.movie-list').css("display", "block");
      }
      else {
        $('.movie-list').css("display", "none");
        $('.not-found').css("display", "block");
      }
    });
  }
};

/**
 * Click handler for show all button.
 *
 */
function showAll() {
  $('.movie-list').empty();
     
  $.get('/allmovies', function(data) {
    if (data.length > 0) {
      for (let i in data) {
        buildMovieList(data[i]);
      }
      $('.not-found').css("display", "none");
      $('.movie-list').css("display", "block");
    }
    else {
      $('.movie-list').css("display", "none");
      $('.not-found').css("display", "block");
    }
  });
}

$(document).ready(function() {
  $('#show-all').click(showAll);
  $('.search-info').submit(submitHandler);
});
