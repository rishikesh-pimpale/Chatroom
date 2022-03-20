const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// socket.io needs to tie in with Express
// create a regular HTTP server with Node that will then share with express and socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let messages = [
    {
        name: 'Admin',
        message: 'Welcome to the chatroom!'
    }
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

const server = http.listen(3000, () => {
    console.log('Server started on port', server.address().port);
});