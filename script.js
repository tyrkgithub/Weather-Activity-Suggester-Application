// Key
const userButton = $("#button");
const apiKey = "12786491ac6b5851aca9bc20462fd30e";
let activityType = "";

// Call Weather API
function callAPI() {
  let userSearch = $("#city-search").val();
  console.log(userSearch);
  // City to Geo Location
  // Geo Location API
  let geoQueryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    userSearch +
    "&limit=1&appid=" +
    apiKey;
  $.ajax({
    url: geoQueryURL,
    method: "GET",
  }).then(function (result) {
    let lat = result[0].lat;
    let lon = result[0].lon;
    let latFixed = lat.toFixed(2);
    let lonFixed = lon.toFixed(2);
    // Location Weather API
    let weatherQueryURL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latFixed +
      "&lon=" +
      lonFixed +
      "&appid=" +
      apiKey;
    $.ajax({
      url: weatherQueryURL,
      method: "GET",
    }).then(function (result) {
      //   Variable for Current Weather
      let weatherMain = result.weather[0].description;
      //   Current Weather to Activity Key
      if ((weatherMain = "broken clouds")) {
        activityType = "education";
      }
      if ((weatherMain = "scattered clouds")) {
        activityType = "diy";
      }
      if ((weatherMain = "few clouds")) {
        activityType = "recreational";
      }
      if ((weatherMain = "clear sky")) {
        activityType = "social";
      }
      if ((weatherMain = "mist")) {
        activityType = "charity";
      }
      if ((weatherMain = "snow")) {
        activityType = "cooking";
      }
      if ((weatherMain = "rain")) {
        activityType = "relaxation";
      }
      if ((weatherMain = "thunderstorm")) {
        activityType = "music";
      }
      if ((weatherMain = "shower rain")) {
        activityType = "busywork";
      }
      console.log(weatherMain);
      console.log(activityType);
      // Call Activity API
      // Uses Activity Type and Number of Participants as Parameters
      let parts = $("#participants-search").val();
      const queryURL =
        "http://www.boredapi.com/api/activity?type=" +
        activityType +
        "&participants=" +
        parts;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (result) {
        console.log(result);
        // Retreives Random Activity from the API
        let activityFind = result.activity;
        console.log(activityFind);
      });
    });
  });
}

//On button click
userButton.on("click", function (event) {
  event.preventDefault();
  callAPI();
});
