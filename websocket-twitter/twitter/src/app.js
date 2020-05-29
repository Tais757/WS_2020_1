const http = require('http');
const server = http.createServer();

const io = require('socket.io')(server);

let tweets = [];

io.on('connect', socket => {
    socket.emit('tweets', tweets);
});

const Twitter = require('node-tweet-stream');

//token do twitter
const twitter = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
});

twitter.track('la casa de papel');

twitter.on('tweet', tweet => {
    io.emit('tweet', tweet);
});

twitter.on('error', err => {
    console.log(err);
});

module.exports = server;