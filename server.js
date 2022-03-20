const express = require('express');

const bodyParser = require('body-parser');

const app = express();

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
    res.sendStatus(200);
});

const server = app.listen(3000, () => {
    console.log('Server started on port', server.address().port);
});