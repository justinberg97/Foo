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
});


var settingsWeather = {
	"async": true,
	"crossDomain": true,
	"url": "https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=Washington%2CDC%2CUSA&contentType=csv&unitGroup=us&shortColumnNames=0",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "7446481de7mshc58650d6922c359p14ec79jsn0f72b55d1a1b",
		"X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com"
	}
};

$.ajax(settingsWeather).done(function (response) {
	console.log(response);
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
});


