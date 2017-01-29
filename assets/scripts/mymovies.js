/**
 * Builds a movie list item.
 *
 * @param {string} movie title
 */
function buildMovieItem(title) {
  $.get("/movie/" + title, function(movie){
    // creating html elements
    var movie_container = $('<li></li>').addClass("movie");
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
    
    let remove_btn = $('<button></button>').addClass("remove-btn").text("Remove from your movies");
    remove_btn.click(function(){
      $.post("/removelist/" + movie.title, function(res) {
        if(!alert("Removed successfully")) {
          location.reload();
        }
      });
    });
    
    let recommend_btn = $('<button></button>').addClass("recommend-btn").text("Recommend");
    let not_recommend_btn = $('<button></button>').addClass("not-recommend-btn").text("Don't Recommend");
    
    recommend_btn.click(function(){
      $.post("/recommend/" + movie.title, function(res) {
        recommend_btn.prop("disabled", true);
        not_recommend_btn.prop("disabled", true);
      });
    });
    
    
    not_recommend_btn.click(function(){
      $.post("/notrecommend/" + movie.title, function(res) {
        recommend_btn.prop("disabled", true);
        not_recommend_btn.prop("disabled", true);
      });
    });
   
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
    
    movie_controls.append(remove_btn);
    movie_controls.append(recommend_btn);
    movie_controls.append(not_recommend_btn);
    
    movie_container.append(movie_info);
    movie_container.append(movie_controls);
    
    $('.movie-list').append(movie_container);
  });
};

/**
 * Loads current users' movie list into view.
 */
function loadMovies() {
  $.get('/movielist', function(data) {
    if (data.length > 0) {
      for (let i in data) {
        buildMovieItem(data[i]);
      }
      $('.movie-list').css("display", "block");
    }
    else {
      $('.not-found').css("display", "block");
    }
  });
};

$(document).ready(function() {
  loadMovies();
});
