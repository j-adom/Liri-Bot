# Liri-Bot
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

Using command-line and node the app receives commands as follows:

To get upcoming concert dates for a given <artist>:
node liri.js concert-this <artist>

To get information about a given <film>:
node liri.js movie-this <film name>

To get information on a given <song>:
node liri.js spotify-this <song name>

To receive a command from a text file save commands to file 'random.txt' in the same directory and run command:
node liri.js do-what-it-says