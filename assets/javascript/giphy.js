$( document ).ready(function() {
  // An array of shows, added shows will be pushed into this array;
  var shows = ["Altered Carbon", "Narcos", "Orange is the New Black", "The OA", "Outlaw King", "Bird Box", "Empire Games", "Immortals", "13th", "Dark","Medal of Honor","Tidying Up with Marie Kondo"];
  
  // Function declaration section
  
  // Function that displays all gif buttons
  function displayshowButtons(){
    $("#showButtons").empty(); // erasing anything in this div id so that it doesnt duplicate the results
    for (var i = 0; i < shows.length; i++){
      var showButton = $("<button>");
      showButton.addClass("show");
      showButton.addClass("btn btn-danger")
      showButton.attr("data-name", shows[i]);
      showButton.text(shows[i]);
      $("#showButtons").append(showButton);
    }
  }
  // Function to add a new show button
  function addNewButton(){
      $("#addGif").on("click", function(){
      var show = $("#show-input").val().trim();
      // added so user cannot add a blank button
      if (show == ""){
        return false; 
      }
      shows.push(show);
      displayshowButtons();
      return false;
      });
  }
  // Function to remove last show button
  function removeLastButton(){
      $("removeGif").on("click", function(){
      shows.pop(show.length);
      displayshowButtons();
      return false;
      });
  }
  // Function that displays all of the gifs
  function displayGifs(){
      var show = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=8HaJ7vk9f5cDR4xDfu7ax2MXY6tlBxnc&limit=10";
      console.log(queryURL); // displays the constructed url
      $.ajax({
          url: queryURL,
          method: 'GET'
      })
      .done(function(response) {
          console.log(response); // console test to make sure something returns
          $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
          var results = response.data; //shows results of gifs
          if (results == ""){
            alert("There isn't a gif for this selected button");
          }
          for (var i=0; i<results.length; i++){
  
              var gifDiv = $("<image>"); //div for the gifs to go inside
              gifDiv.addClass("gifDiv image-fluid");
              // getting rating of gif
              var gifRating = $("<p>").text("Rating: " + results[i].rating);
              gifDiv.append(gifRating);
              // getting gif
              var gifImage = $("<img>");
              gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
              gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
              gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
              gifImage.attr("data-state", "still"); // set the image state
              gifImage.addClass("image");
              gifDiv.append(gifImage);
              // getting still image of gif
              // adding gifDiv to gifsView div
              $("#gifsView").prepend(gifDiv);
          }
      });
  }
  // Functions to be called on page load

  // displays list of shows already created
  displayshowButtons();
  addNewButton();
  removeLastButton();
  // Document Event Listeners
  $(document).on("click", ".show", displayGifs);
  $(document).on("click", ".image", function(){
      var state = $(this).attr('data-state');
      if ( state == 'still'){
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
      } else {
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
      }
  });

});