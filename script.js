// Key
const userButton = $("#button");
const apiKey = "12786491ac6b5851aca9bc20462fd30e";
let activityType = "";
let displayWeather = $("#displayWeather");
let displayActivities = $("#displayActivities");
// dates -
let today = moment().format("DD/MM/YYYY");
let tomorrow = moment().add(1, "days").format("DD/MM/YYYY");
let day3 = moment().add(2, "days").format("DD/MM/YYYY");
let day4 = moment().add(3, "days").format("DD/MM/YYYY");
let day5 = moment().add(4, "days").format("DD/MM/YYYY");
let day6 = moment().add(5, "days").format("DD/MM/YYYY");

// On Load

// datepicker functionality
$(function () {
  $("#datepicker").datepicker({ minDate: 0, maxDate: "+5D", hideIfNoPrevNext: true, duration: '' });
});

// Call Weather API
function callAPI(city) {
  let userSearch = city || $("#city-search").val();
  let searchHistory = [];
  let history = $("#history");
  $("#history").empty();

  searchHistory.push(userSearch);
  // City to Geo Location
  // Geo Location API
  let geoQueryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
      let currentLocation = result.city.name;

      let storage = JSON.parse(localStorage.getItem("historyLocation")) || [];

      if (!storage.includes(currentLocation)) {
        storage.push(currentLocation);
      }
      localStorage.setItem("historyLocation", JSON.stringify(storage));
      for (let i = 0; i < storage.length; i++) {
        let historyBtn = $("<button>").text(storage[i]).addClass("historyBtn button");

        historyBtn.on("click", function (event) {
          event.preventDefault();
          $("#history").empty();
          $(".gifCardImg").remove();
          $(".weatherImg").remove();
          callAPI(storage[i]);
          // initPage()
        });
        history.append(historyBtn);
      }
    });

    $.ajax({
      url: weatherQueryURL,
      method: "GET",
    }).then(function (result) {
      console.log(result);
      //   Weather with Date Picker
      let dateSearch = moment($("#datepicker").val()).format("DD/MM/YYYY");
      let weatherMain = "";
      let weatherDescription = "";
      if (!$("#datepicker").val()) {
        dateSearch = today;
        weatherDescription = result.list[0].weather[0].description;
        weatherMain = result.list[0].weather[0].main;
      } else if (dateSearch === today) {
        weatherDescription = result.list[0].weather[0].description;
        weatherMain = result.list[0].weather[0].main;
      } else if (dateSearch === tomorrow) {
        weatherDescription = result.list[8].weather[0].description;
        weatherMain = result.list[8].weather[0].main;
      } else if (dateSearch === day3) {
        weatherDescription = result.list[16].weather[0].description;
        weatherMain = result.list[16].weather[0].main;
      } else if (dateSearch === day4) {
        weatherDescription = result.list[24].weather[0].description;
        weatherMain = result.list[24].weather[0].main;
      } else if (dateSearch === day5) {
        weatherDescription = result.list[32].weather[0].description;
        weatherMain = result.list[32].weather[0].main;
      } else if (dateSearch === day6) {
        weatherDescription = result.list[39].weather[0].description;
        weatherMain = result.list[39].weather[0].main;
      }
      console.log(weatherDescription);

      //   Variable for Current Weather
      console.log(weatherMain);
      let currentWeather = $("#currentWeather");
      currentWeather.text(
        "The weather for " +
        dateSearch +
        " " +
        userSearch +
        " is " +
        weatherDescription
      );
      //   Current Weather to Activity Key
      if (weatherMain == "Clear") {
        activityType = "social";
        let weatherImg = $("<img>")
          .attr("src", "assets/clear-sky-background.png")
          .addClass("weatherImg");
        $("#displayWeather").prepend(weatherImg);
      } else if (weatherMain == "Clouds") {
        activityType = "recreational";
        let weatherImg = $("<img>")
          .attr("src", "assets/few-clouds-background.png")
          .addClass("weatherImg");
        $("#displayWeather").prepend(weatherImg);
      } else if (
        weatherMain == "Sand" ||
        "Mist" ||
        "Ash" ||
        "Squall" ||
        "Tornado"
      ) {
        activityType = "charity";
        let weatherImg = $("<img>")
          .attr("src", "assets/mist-background.png")
          .addClass("weatherImg");
        $("#displayWeather").prepend(weatherImg);
      } else if (weatherMain == "Snow") {
        activityType = "cooking";
        let weatherImg = $("<img>")
          .attr("src", "assets/snow-background.png")
          .addClass("weatherImg");
        $("#displayWeather").prepend(weatherImg);
      } else if (weatherMain == "Rain") {
        activityType = "relaxation";
        let weatherImg = $("<img>")
          .attr("src", "assets/rain-background.png")
          .addClass("weatherImg");
        $("#displayWeather").prepend(weatherImg);
      } else if (weatherMain == "Thunderstorm") {
        activityType = "music";
        let weatherImg = $("<img>")
          .attr("src", "assets/thunderstorm-background.png")
          .addClass("weatherImg");
        $("#displayWeather").prepend(weatherImg);
      } else if (weatherMain == "Drizzle") {
        activityType = "busywork";
        let weatherImg = $("<img>")
          .attr("src", "assets/shower-rain-background.png")
          .addClass("weatherImg");
        $("#displayWeather").prepend(weatherImg);
      } else if (weatherMain == "Smoke" || "Haze") {
        activityType = "education";
        let weatherImg = $("<img>")
          .attr("src", "assets/broken-clouds-background.png")
          .addClass("weatherImg");
        $("#displayWeather").prepend(weatherImg);
      } else if (weatherMain == "Dust" || "Dust" || "Fog") {
        activityType = "diy";
        let weatherImg = $("<img>")
          .attr("src", "assets/scattered-clouds-background.png")
          .addClass("weatherImg");
        $("#displayWeather").prepend(weatherImg);
      }
      console.log(activityType);

      // Call Activity API
      // Uses Activity Type and Number of Participants as Parameters
      const queryURL =
        "https://www.boredapi.com/api/activity?type=" + activityType;
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
        let gifURL =
          "https://api.giphy.com/v1/gifs/search?api_key=SI1alLDNWOzJX8XiNLAc2pSjZBtKqcUa&q=" +
          gifRequest +
          "&limit=1&rating=g&lang=en";
        $.ajax({
          url: gifURL,
          method: "GET",
        }).then(function (result) {
          let gif = $("<img>")
            .attr("src", result.data[0].images.original.url)
            .addClass("gifCardImg");
          $("#activity1Container").prepend(gif);
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
          let gifURL =
            "https://api.giphy.com/v1/gifs/search?api_key=SI1alLDNWOzJX8XiNLAc2pSjZBtKqcUa&q=" +
            gifRequest +
            "&limit=1&rating=g&lang=en";

          $.ajax({
            url: gifURL,
            method: "GET",
          }).then(function (result) {
            let gif = $("<img>")
              .attr("src", result.data[0].images.original.url)
              .addClass("gifCardImg");
            $("#activity2Container").prepend(gif);
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
          let gifURL =
            "https://api.giphy.com/v1/gifs/search?api_key=SI1alLDNWOzJX8XiNLAc2pSjZBtKqcUa&q=" +
            gifRequest +
            "&limit=1&rating=g&lang=en";
          $.ajax({
            url: gifURL,
            method: "GET",
          }).then(function (result) {
            let gif = $("<img>")
              .attr("src", result.data[0].images.original.url)
              .addClass("gifCardImg");
            $("#activity3Container").prepend(gif);
          });
        });
      });
    });
  });
}

function initPage() {
  let storage = JSON.parse(localStorage.getItem("historyLocation"));
  if (storage !== null) {
    for (let i = 0; i < storage.length; i++) {
      let historyBtn = $("<button>").text(storage[i]).addClass("historyBtn button");
      $("#history").append(historyBtn);

      historyBtn.on("click", function (event) {
        event.preventDefault();
        callAPI(storage[i]);
      });
    }
  } else {
    return;
  }
}

window.onload = initPage();
// modal close
$(".close").on("click", function () {
  $("#incorrect-entry-modal").hide();
});
//On button click
userButton.on("click", function (event) {
  // Show modal IF there is no entry in cells
  if ($("#city-search").val().trim() == "") {
    $("#incorrect-entry-modal").show();
    return;
  }
  event.preventDefault();
  $(".gifCardImg").remove();
  $(".weatherImg").remove();
  callAPI();
});
