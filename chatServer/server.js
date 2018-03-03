var app = require('express')();
var server = require('http').Server(app);
var keys = Object.keys || require('object-keys');
var fs = require('fs');
var models = require("./models/models");


var io = require('socket.io')(server, {
    //serveClient: false,
    // below are engine.IO options
    pingInterval: 4000,
    pingTimeout: 2000,
    cookie: true,

});

var io = io.of('/chat');

//Connection
io.on('connection', function(socket) {
    socket.on('newUser', function(userId) {

        socket.userId = userId;

        models.User.findOne({where: {id: userId}})
            .then(user => {
                user.online = true;
                user.save();
            });

        socket.broadcast.emit('newUserOnline', userId);

    });
});

//Disconnection
io.on('connection', function(socket) {
    socket.on('disconnect', function() {

        console.log(socket.userId);

        models.User.findOne({where: {id: socket.userId}})
            .then(user => {
                user.online = false;
                user.save();

            });
    });
});

//Selecting new chats
io.on('connection', function(socket) {

    socket.on('room', function(room) {
        socket.join(room);

        console.log("Now in room: " + room);

        let filename = 'chats/' + room + '.json';

        fs.readFile(filename, function(err, data) {

            if (err) {
                console.log(err);

                let data = [];

                data = JSON.stringify(data);

                fs.writeFile(filename, data, function(err) {
                    console.log("Write file error: " + err);

                });
            } else {
                data = JSON.parse(data);
                socket.emit('getHistory', data);
            }

        });

    });

});

//Sending msgs to receivers
io.on('connection', function(socket) {

    socket.on('message', function(msg) {

        var room = "" + msg.chatId;

        let filename = 'chats/' + room + '.json';

        /* fs.readFile(filename, function(err, data) {
             data = JSON.parse(data);
             data.splice(0, 0, msg);
             data = JSON.stringify(data);

             fs.writeFile(filename, data, function(err) {
                 console.log("Write file error: " + err);

             });

         });*/

        socket.broadcast.to(room).emit('chat message', msg);

    });
});

//Typing function
io.on('connection', function(socket) {

    socket.on('typing', function(details) {

        var room = "" + details.chat;

        socket.broadcast.to(room).emit('typing', details);

    });
});

//Server listening
server.listen(4000, function() {
    console.log('listening on *:4000');
});
