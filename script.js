function listVenue(data) {
    var games = data.results
    var venues = []
    games.forEach(game => {
        if (game.details.league === "NHL") {
            venues.push(game.venue.city)

        }

    });
    return venues;
}

function listGames(data) {
    var games = data.results
    var scoreCard = $("#scoreCard")
    games.forEach(game => {
        if (game.details.league === "NHL") {
            console.log(game)
            var gameDiv = $("<div>")
            gameDiv.text(game.summary)
            scoreCard.append(gameDiv);
        }
    });
}

function listScores(data) {
    var games = data.results
    var scoreCard = $("#scoreCard")
    games.forEach(game => {
        if (game.details.league === "NHL") {
            console.log(game)
            var gameUl = $("<ul>")
            var gameLiAway = $("<li>")
            var gameLiHome = $("<li>")
            gameLiAway.text(game.scoreboard.score.away)
            gameUl.append(gameLiAway);
            console.log(awayScore)
            gameLiHome.text(game.scoreboard.score.home)
            gameUl.append(gameLiHome);
            scoreCard.append(gameUl)
        }
    });
}

function saveScores(data) {

}

var settingsScores = {
    "async": true,
    "crossDomain": true,
    "url": "https://sportspage-feeds.p.rapidapi.com/teams?league=NFL",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": "7446481de7mshc58650d6922c359p14ec79jsn0f72b55d1a1b",
        "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com"
    }
};

$.ajax(settingsScores).done(function (response) {
    console.log(response);
    console.log(response.venue)
});


function searchCity(city) {
    //fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + venue +'&limit={limit}&appid=29629d07a798cd81165a6be24018b444')
    var request = $.ajax({
        url: 'http://api.openweathermap.org/geo/1.0/direct?q=' + city +'&limit=1&appid=29629d07a798cd81165a6be24018b444',
        method: "GET",
        success: function (response) {
            // response from OpenWeatherMap
            console.log(response);
        }
    });
}


//fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=29629d07a798cd81165a6be24018b444')
var request = $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather",
    method: "GET",
    data: { id: '2172797', appid: '29629d07a798cd81165a6be24018b444' },
    success: function (response) {
        // response from OpenWeatherMap
        //var dataArray = JSON.parse(response); // create an array from JSON element
        console.log(response)
    }
});




var settingsGames = {
    "async": true,
    "crossDomain": true,
    "url": "https://sportspage-feeds.p.rapidapi.com/games",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": "7446481de7mshc58650d6922c359p14ec79jsn0f72b55d1a1b",
        "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com"
    }
};

$.ajax(settingsGames).done(function (response) {
    console.log(response);

    var venues = listVenue(response)
    console.log(venues)
    listGames(response)
    listScores(response)
    searchCity(venues[0])
});