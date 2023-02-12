// Key
const userButton = $("#button");
const apiKey = "12786491ac6b5851aca9bc20462fd30e";
let activityType = "";
let displayWeather = $("#displayWeather");
let displayActivities = $("#displayActivities");

// Call Weather API
function callAPI() {
  let userSearch = $("#city-search").val();
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
    console.log(result);
    // Location Weather API
    let weatherQueryURL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latFixed +
      "&lon=" +
      lonFixed +
      "&appid=" +
      apiKey;

    // $.ajax({
    //   url: weatherQueryURL,
    //   method: "GET",
    // }).then(function (result) {
    //   let historyLocation = "historyLocation";
    //   let currentLocation = result.name;

    //   let storage = JSON.parse(localStorage.getItem("historyLocation")) || [];

    //   if (!storage.includes(currentLocation)) {
    //     storage.push(currentLocation);
    //   }
    //   localStorage.setItem("historyLocation", JSON.stringify(storage));
    //   for (let i = 0; i < storage.length; i++) {
    //     let historyBtn = $("<button>").text(storage[i]);

    //     historyBtn.on("click", function (event) {
    //       event.preventDefault();
    //       $("#history").empty();
    //       // userSearch.value(historyBtn.text);

    //       searchWeather(storage[i]);
    //       console.log(storage[i]);
    //     });
    //     history.append(historyBtn);
    //   }

    $.ajax({
      url: weatherQueryURL,
      method: "GET",
    }).then(function (result) {
      //   Variable for Current Weather
      let weatherMain = result.weather[0].description;
      let currentWeather = $("#currentWeather");
      currentWeather.text("The current weather is " + weatherMain);
      //   Current Weather to Activity Key
      if (weatherMain == "broken clouds") {
        activityType = "education";
      } else if (weatherMain == "scattered clouds") {
        activityType = "diy";
      } else if (weatherMain == "few clouds") {
        activityType = "recreational";
      } else if (weatherMain == "clear sky") {
        activityType = "social";
      } else if (weatherMain == "mist") {
        activityType = "charity";
      } else if (weatherMain == "snow") {
        activityType = "cooking";
      } else if (weatherMain == "rain") {
        activityType = "relaxation";
      } else if (weatherMain == "thunderstorm") {
        activityType = "music";
      } else if (weatherMain == "shower rain") {
        activityType = "busywork";
      }
      // Call Activity API
      // Uses Activity Type and Number of Participants as Parameters
      const queryURL =
        "http://www.boredapi.com/api/activity?type=" + activityType;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (result) {
        let activityText = $("#activityText");
        activityText.text(
          "Here are 3 suggestions, based on the the weather in " + userSearch
        );
        let activityFind1 = result.activity;
        let activity1 = $("#activity1");
        activity1.text(activityFind1);
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (result) {
          let activityFind2 = result.activity;
          let activity2 = $("#activity2");
          activity2.text(activityFind2);
        });
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (result) {
          let activityFind3 = result.activity;
          let activity3 = $("#activity3");
          activity3.text(activityFind3);
        });
      });
    });
  });
}

//On button click
userButton.on("click", function (event) {
  event.preventDefault();
  callAPI();
});

// console.log(activityFind1);
// let activity1Div = $("<div>");
// let activity1 = $("<h5>");
// let activity1Text = $("<p>");
// activity1.text("Activity 1");
// console.log(activity1);
// activity1Text.text(
//   "Your first suggested activity is " + activityFind1 + "!"
// );
// activity1Div.append(activity1, activity1Text);
// });
