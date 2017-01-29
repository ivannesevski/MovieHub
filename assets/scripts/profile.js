/**
 * Loads profile information into view.
 */
function loadProfile() {
  $.get('/profiledata', function(data) {
    $('#first-name').val(data.firstName);
    $('#last-name').val(data.lastName);
    $('#gender').val(data.gender);
    $('#DoB').val(data.DoB);
    $('#about').val(data.about);
    $('#private').prop("checked", data.private);
  });
};

/**
 * Submit handler for updating password.
 *
 * @param {object} click event
 */
function submitHandler(evt) {
  evt.preventDefault();
  
  let formData = $('form').serialize();
  $.post('/updatepassword', formData, function(res) {
    if (res['error']) {
      $('.error').text(res['error']);
    }
    else {
      alert("Updated Successfully");
    }
  });
};

$(document).ready(function() {
  loadProfile();
  
  $('.account-info').submit(submitHandler);
  
  // set click handlers for navigating profile
  $('#general-btn').click(function() {
    $('.account-content').css("display", "none");
    $('.privacy-content').css("display", "none");
    $('.selected').toggleClass("selected");
    $('.general-content').css("display", "block");
    $('#general-btn').toggleClass("selected");
  });
  
  $('#account-btn').click(function() {
    $('.general-content').css("display", "none");
    $('.privacy-content').css("display", "none");
    $('.selected').toggleClass("selected");
    $('.account-content').css("display", "block");
    $('#account-btn').toggleClass("selected");    
  });
  
  $('#privacy-btn').click(function() {
    $('.general-content').css("display", "none");
    $('.account-content').css("display", "none");
    $('.selected').toggleClass("selected");
    $('.privacy-content').css("display", "block");
    $('#privacy-btn').toggleClass("selected");   
  });
});
