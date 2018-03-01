var app = require('express')();
var server = require('http').Server(app);
var keys = Object.keys || require('object-keys');
var fs = require('fs');


var io = require('socket.io')(server, {
    //serveClient: false,
    // below are engine.IO options
    pingInterval: 4000,
    pingTimeout: 2000,
    cookie: true

});

var onlineUsers = [];


var io = io.of('/chat');

//Connection
io.on('connection', function (socket) {
    socket.on('newUser', function (userId) {

        //console.log('a user connected');

        socket.userId = userId;

        //Adding the user to the array.

        //First user ever (empty array)
        if (onlineUsers.length < 1) {
            onlineUsers.push(userId);

            //Notify everyone there's a new user online
            socket.broadcast.emit('getUsersOnline', onlineUsers);
            socket.emit('getUsersOnline', onlineUsers);
            return;
        }

        //It needs to be sorted (from least id to greatest id)
        for (var i = 0; i < onlineUsers.length; i++) {

            if (onlineUsers[i] === userId) {
                return;
            }

            if (onlineUsers[i] > userId) {
                onlineUsers.splice(i, 0, userId);

                //Notify everyone there's a new user online
                socket.broadcast.emit('getUsersOnline', onlineUsers);
                socket.emit('getUsersOnline', onlineUsers);
                return;
            }

        }

        //If it's the last one
        onlineUsers.push(userId);

        //Notify everyone there's a new user online
        socket.broadcast.emit('getUsersOnline', onlineUsers);
        socket.emit('getUsersOnline', onlineUsers);

    });


});

//Disconnection
io.on('connection', function (socket) {
    socket.on('disconnect', function () {

        //Remove an user from array
        for (var i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i] === socket.userId) {
                onlineUsers.splice(i, 1);
            }
        }

        //Notify everyone there's a new user offline
        socket.broadcast.emit('getUsersOnline', onlineUsers);
        //console.log('user disconnected');
    });
});

//Selecting new chats
io.on('connection', function (socket) {

    socket.on('room', function (room) {
        socket.join(room);

        let filename = 'chats/' + room + '.json';

        fs.readFile(filename, function (err, data) {

            if (err) {
                console.log(err);

                let data = [];

                data = JSON.stringify(data);

                fs.writeFile(filename, data, function (err) {
                    console.log("Write file error: " + err);

                })
            } else {
                data = JSON.parse(data);
                socket.emit('getHistory', data);
            }

        })


    });


});

//Sending msgs to receivers
io.on('connection', function (socket) {

    socket.on('message', function (msg) {

        var room = "" + msg.chat;

        let filename = 'chats/' + room + '.json';

        fs.readFile(filename, function (err, data) {
            data = JSON.parse(data);
            data.splice(0, 0, msg);
            data = JSON.stringify(data);

            fs.writeFile(filename, data, function (err) {
                console.log("Write file error: " + err);

            })

        })

        socket.broadcast.to(room).emit('chat message', msg);

    });
});


//Typing function
io.on('connection', function (socket) {

    socket.on('typing', function (details) {

        var room = "" + details.chat;

        socket.broadcast.to(room).emit('typing', details);

    });
});

//Server listening
server.listen(4000, function () {
    console.log('listening on *:4000');
});
