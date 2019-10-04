//LIRI Bot!

// code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// code required to import the 'keys.js' file and store it in a variable
var keys = require("./keys.js");

var axios = require("axios");
var moment = require('moment');
var fs = require('fs');


// access Spotify keys information
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var inputArgs = process.argv.slice(3);
var searchString = inputArgs.join(' ')

function printEvents(event){
    console.log("------------------------")
    let randomDate = moment(event.datetime);
    let randomFormat = "MM/DD/YYYY";
    let convertedDate = randomDate.format(randomFormat)
    console.log(convertedDate)
    console.log(event.venue.name);
    console.log(event.venue.city + ", "+ event.venue.region + ", " + event.venue.country)

}
function concertThis (band){
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp&date=upcoming").then(
  function(response) {
    console.log("Upcoming concert dates for "+ searchString +":")
    response.data.forEach((event)=>printEvents(event));
    
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // 'error.request' is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function spotifySong(song){
    
    if(!song){
        song = 'Ace of Base The Sign'
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
        console.log("------------------------")
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name); 
        console.log("Song Name: "+ data.tracks.items[0].name); 
        console.log("Album Title: "+ data.tracks.items[0].album.name); 
        console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify); 
        console.log("------------------------")

      });

}

function movieThis(movie){

    let movieName = '';
    movieName = movie.replace(/ /g, '+'); 

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    if(queryUrl === 'http://www.omdbapi.com/?t=&y=&plot=short&apikey=trilogy'){
        queryUrl = 'http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy'
    }
    
    axios.get(queryUrl).then(
    function(response) {
        console.log("------------------------")
        console.log(response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log(response.data.Ratings[1].Source + " Rating: " + response.data.Ratings[1].Value)
        console.log("Language(s): " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Lead Actors: " + response.data.Actors);
        console.log("------------------------")

    })
    .catch(function(error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

function doWhat(){

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        var dataArr = data.split(",");
        switcher(dataArr[0],dataArr[1])
      
      });    
}

function switcher(command,searchString){
    switch (command){
        case 'concert-this':
            concertThis(searchString);
            break;
        case 'spotify-this-song':
                spotifySong(searchString)
            break;
        case 'movie-this':
            if(searchString === undefined){
                movieThis('Mr. Nobody')
            } else{
                movieThis(searchString)
            }
            break;
        case 'do-what-it-says':
            doWhat()
            break;
        default:
            console.log("Please input one of the following commands: \nconcert-this \nspotify-this-song \nmovie-this or \ndo-what-it-says  ")    
    }
}
switcher(process.argv[2], searchString)