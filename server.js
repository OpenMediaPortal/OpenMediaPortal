/**
 * @fileoverview Open Media Player <br>
 *
 * Primary entry point of the server
 *
 * https://google.github.io/styleguide/javascriptguide.xml
 * @author ojourmel
 */

var express = require('express'),
    logger = require('morgan'),
    music = require('./routes/music'),
    path = require('path');

var app = express();

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.use(logger('dev'));
}

// Serve static files instead of a real API endpoint
app.get('/player', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/player/index.html'));
});
app.get('/player/music', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/player/music.html'));
});
app.get('/player/movies', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/player/movies.html'));
});
app.get('/player/tv', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/player/tv.html'));
});
app.get('/player/photos', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/player/photos.html'));
});


// Serve endpoint code
app.get('/music', music.findAll);
app.get('/music/:id', music.findById);
app.post('/music', music.addMusic);
app.put('/music/:id', music.updateMusic);
app.delete('/music/:id', music.deleteMusic);

app.listen(3000);
console.log('Listening on port 3000...');
