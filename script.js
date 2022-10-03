var gameChoices = document.getElementById("gameChoices")

function listVenue(data) {
  var games = data.results;
  var venues = [];
  games.forEach((game) => {
    if (game.details.league === "NHL") {
      venues.push(game.venue.city);
    }
  });
  return venues;
}

function listGames(data) {
  var games = data.results;
  console.log(games)
  var scoreCard = $("#scoreCard");
  games.forEach((game, i) => {
    if (game.details.league === "NHL") {
        console.log(game)
      var gameDiv = $("<div>");
      gameDiv.addClass("card blue darken-4")
      gameDiv.css({ "margin": "8px", "padding": "4px", })
      var gameTitle = $("<div>");
      var gameWeather = $("<div>");
      gameWeather[0].id = i;
      gameTitle.text(game.summary);

      searchCity(game.venue.city, i);
      gameDiv.append(gameTitle);
      scoreCard.append(gameDiv);
      if (game.scoreboard) {
      gameDiv.append(game.scoreboard.score.away);
      gameDiv.append("-")
      gameDiv.append(game.scoreboard.score.home);
      }

      gameDiv.append("<br> Today's Weather")
      gameDiv.append(gameWeather)
      console.log(gameWeather);
    }
  });
}

function listScores(data) {
  var games = data.results;
  var scoreCard = $("#scoreCard");
  games.forEach((game) => {
    if (game.details.league === "NHL" && game.scoreboard) {
      var gameUl = $("<ul>");
      var gameLiAway = $("<li>");
      var gameLiHome = $("<li>");
      gameLiAway.text(game.scoreboard.score.away);
      gameLiHome.text(game.scoreboard.score.home);
      scoreCard.append(gameUl);
    }
  });
}

function listWeather(data, i) {
  var weather = data.list;
  console.log(weather);
  var scoreCard = $("#scoreCard");
  weather.forEach((venue) => {
    var temp = venue.main.temp;
    var weatherMain = venue.weather[0].main;
    $("#" + i).text(Math.floor(temp) + "° " + weatherMain);
    console.log(weatherMain);
  });
}



var settingsScores = {
  async: true,
  crossDomain: true,
  url: "https://sportspage-feeds.p.rapidapi.com/teams?league=NFL",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7446481de7mshc58650d6922c359p14ec79jsn0f72b55d1a1b",
    "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com",
  },
};

$.ajax(settingsScores).done(function (response) {
  console.log(response);
  console.log(response.venue);
});

function searchCity(city, i) {
  var request = $.ajax({
    url:
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=29629d07a798cd81165a6be24018b444",
    method: "GET",
    success: function (response) {
      getCityWeather(response[0].lat, response[0].lon, i);
      return;
    },
  });
}

//Record Tally
var correct = document.getElementById("correct");
var incorrect = document.getElementById("incorrect");
var reset = document.getElementById("reset");
var counter = document.querySelector(".counter");
var correctBtn = document.getElementById("correctBtn");
var correctCount = 0
var incorrectBtn = document.getElementById("incorrectBtn");
var incorrectCount = 0


correctBtn.addEventListener("click", function () {
  var updatedCount = localStorage.getItem("correct")||0;
  updatedCount++
  localStorage.setItem("correct", updatedCount);
  correct.textContent = updatedCount;
});

correct.textContent= localStorage.getItem("correct")

incorrectBtn.addEventListener("click", function () {
  var incorrectCount = localStorage.getItem("incorrect")||0;
  incorrectCount++
  localStorage.setItem("incorrect", incorrectCount);
  incorrect.textContent = incorrectCount;
});

incorrect.textContent= localStorage.getItem("incorrect")

reset.addEventListener("click", function(){
  localStorage.removeItem("correct")
  localStorage.removeItem("incorrect")
  correct.textContent=0
  incorrect.textContent=0
})


//LOCAL STORAGE
function savePred() {
  var prediction = document.getElementById("prediction").value;

  var userPred = localStorage.setItem("prediction", prediction);

  var userPred = localStorage.getItem("prediction", prediction);

  var guesses = $("#guesses");
  guesses.text(userPred);

}

$("#btn").on("click", savePred)

$("#guesses").text(localStorage.getItem("prediction"))

$("#clear").on("click", function () {
  localStorage.removeItem("prediction");
  $("#guesses").text("")
})

function getCityWeather(lat, lon, i) {
  console.log(lat, lon);
  var request = $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=7&appid=29629d07a798cd81165a6be24018b444`,
    method: "GET",
    success: function (response) {
      console.log(response.list);
      listWeather(response, i);
      return response.list;
    },
  });
}

var request = $.ajax({
  url: "http://api.openweathermap.org/data/2.5/weather",
  method: "GET",
  data: { id: "2172797", appid: "29629d07a798cd81165a6be24018b444" },
  success: function (response) {
    console.log(response);
  },
});

var settingsGames = {
  async: true,
  crossDomain: true,
  url: "https://sportspage-feeds.p.rapidapi.com/games",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7446481de7mshc58650d6922c359p14ec79jsn0f72b55d1a1b",
    "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com",
  },
};

$.ajax(settingsGames).done(function (response) {

  var venues = listVenue(response);
  console.log(venues);
  listGames(response);
  listScores(response);
//   listTeams();
});
