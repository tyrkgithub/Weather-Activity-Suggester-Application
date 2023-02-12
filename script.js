// Key
const userButton = $("#button");
const apiKey = "12786491ac6b5851aca9bc20462fd30e";
let activityType = "";
let displayWeather = $("#displayWeather");
let displayActivities = $("#displayActivities");
// dates - 
let today = moment().format('DD/MM/YYYY');
let tomorrow = moment().add(1, 'days').format('DD/MM/YYYY');
let day3 = moment().add(2, 'days').format('DD/MM/YYYY');
let day4 = moment().add(3, 'days').format('DD/MM/YYYY');
let day5 = moment().add(4, 'days').format('DD/MM/YYYY');
let day6 = moment().add(5, 'days').format('DD/MM/YYYY');


// Call Weather API
function callAPI() {
  let userSearch = $("#city-search").val();

  let searchHistory = [];
  let history = $("#history");
  $("#history").empty();
  searchHistory.push(userSearch);
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
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      latFixed +
      "&lon=" +
      lonFixed +
      "&appid=" +
      apiKey;

    $.ajax({
      url: weatherQueryURL,
      method: "GET",
    }).then(function (result) {
      let historyLocation = "historyLocation";
      let currentLocation = result.name;

      let storage = JSON.parse(localStorage.getItem("historyLocation")) || [];

      if (!storage.includes(currentLocation)) {
        storage.push(currentLocation);
      }
      localStorage.setItem("historyLocation", JSON.stringify(storage));
      for (let i = 0; i < storage.length; i++) {
        let historyBtn = $("<button>").text(storage[i]);

        historyBtn.on("click", function (event) {
          event.preventDefault();
          $("#history").empty();
          // userSearch.value(historyBtn.text);
          $('.gifCardImg').remove();
          callAPI(storage[i]);
        });
        history.append(historyBtn);
      }
    });

    $.ajax({
      url: weatherQueryURL,
      method: "GET",
    }).then(function (result) {
      //   Weather with Date Picker
      let dateSearch = moment($("#datepicker").val()).format('DD/MM/YYYY')
      let weatherMain = "";
      if (dateSearch === today) {
        weatherMain = result.list[0].weather[0].description;
      } else if (dateSearch === tomorrow) {
        weatherMain = result.list[8].weather[0].description;
      } else if (dateSearch === day3) {
        weatherMain = result.list[16].weather[0].description;
      } else if (dateSearch === day4) {
        weatherMain = result.list[24].weather[0].description;
      } else if (dateSearch === day5) {
        weatherMain = result.list[32].weather[0].description;
      } else if (dateSearch === day6) {
        weatherMain = result.list[39].weather[0].description;
      }
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
        // Call giffy API
        let gifRequest = activityFind1;
        if (gifRequest.length > 50) {
          gifRequest = gifRequest.slice(0, 49);
        }
        let gifURL = 'https://api.giphy.com/v1/gifs/search?api_key=SI1alLDNWOzJX8XiNLAc2pSjZBtKqcUa&q=' + gifRequest + '&limit=1&rating=g&lang=en';
        $.ajax({
          url: gifURL,
          method: "GET",
        }).then(function (result) {
          let gif = $('<img>').attr('src', result.data[0].images.original.url).addClass('gifCardImg');
          $('#activity1Container').prepend(gif);
        });
          $.ajax({
            url: queryURL,
            method: "GET",
          }).then(function (result) {
            let activityFind2 = result.activity;
            let activity2 = $("#activity2");
            activity2.text(activityFind2);
            // Call giffy API
            let gifRequest = activityFind2;
            if (gifRequest.length > 50) {
              gifRequest = gifRequest.slice(0, 49);
            }
            let gifURL = 'https://api.giphy.com/v1/gifs/search?api_key=SI1alLDNWOzJX8XiNLAc2pSjZBtKqcUa&q=' + gifRequest + '&limit=1&rating=g&lang=en';
          $.ajax({
            url: gifURL,
            method: "GET",
          }).then(function (result) {
            let gif = $('<img>').attr('src', result.data[0].images.original.url).addClass('gifCardImg');
            $('#activity2Container').prepend(gif);
          });
        });
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (result) {
          let activityFind3 = result.activity;
          let activity3 = $("#activity3");
          activity3.text(activityFind3);
          // Call giffy API
          let gifRequest = activityFind3;
          if (gifRequest.length > 50) {
            gifRequest = gifRequest.slice(0, 49);
          }
          let gifURL = 'https://api.giphy.com/v1/gifs/search?api_key=SI1alLDNWOzJX8XiNLAc2pSjZBtKqcUa&q=' + gifRequest + '&limit=1&rating=g&lang=en';
        $.ajax({
          url: gifURL,
          method: "GET",
        }).then(function (result) {
          let gif = $('<img>').attr('src', result.data[0].images.original.url).addClass('gifCardImg');
          $('#activity3Container').prepend(gif);
        });
        });
      });
    });
  });
}

//On button click
userButton.on("click", function (event) {
  event.preventDefault();
  $('.gifCardImg').remove();
  callAPI();
});
// datepicker functionality
$(function () {
  $("#datepicker").datepicker({ minDate: 0, maxDate: "+5D" });
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






// let a = 'qwertyuiRpasdfgh';
// console.log(a);
// if (a.length > 10) {
//   a = a.slice(0, 9);
  
// }
// console.log(a);