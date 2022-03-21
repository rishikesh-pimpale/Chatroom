const express = require('express');
const bodyParser = require('body-parser');

// socket.io needs to tie in with Express
// create a regular HTTP server with Node that will then share with express and socket.io
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
const Message = mongoose.model('Message', {
    name: String,
    message: String
});
mongoose.Promise = Promise;

app.get('/messages', (req, res) => {
    Message.find({})
        .then(messages => {
            res.send(messages);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.post('/messages', async (req, res) => {

    try {

        let message = new Message(req.body);

        await message.save();
        console.log("Message saved");

        let censored = await Message.findOne({ message: 'badword' });

        if (censored) {
            await Message.deleteOne({ _id: censored.id });
        }
        else {
            io.emit('message', req.body);
        }
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
    finally {
        console.log('Message post called');
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
});

const dbUrl = process.env.dbUrl ?? require('./config.js').dbUrl;
mongoose.connect(dbUrl, (err) => {
    console.log('MongoDB connection', err);
});

http.listen(port, () => {
    console.log(`Server started on port ${port}`);
});