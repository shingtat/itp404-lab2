let source = document.getElementById('yelp-template').innerHTML;
let template = Handlebars.compile(source);
Handlebars.registerHelper('list', function(context, options) {
  var ret = "<ul>";

  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + "<li>" + context[i] + "</li>";
  }

  return ret + "</ul>";
});

$(document).ready(function() {
  $("#loading").css("display", "block");
  $.ajax({
   type: "GET",
    url: "https://thejsguy.com/teaching/2018/api/restaurants.json",
    data: $(this).serialize(),
    success: function(response) {
      console.log(response.data);
      let renderedRestaurants = template({
        restaurants: response.data
      });
      $('#post_container').append(renderedRestaurants);
    },
    error: function() {
      $("#post_container").text("Oops! Something went wrong!");
    },
    complete: function(data) {
      $("#loading").css("display", "none");
    }
  })
})
