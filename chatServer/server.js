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

        models.UnreadMessages.findAll({
            where: {
                authorId: {
                    $ne: socket.userId,
                },
            },

        }).then(notifications => {

            if (notifications) {
                socket.emit('get initial notifications', notifications);
            }

        });

        socket.broadcast.emit('newUserOnline', userId);

    });
});

//Disconnection
io.on('connection', function(socket) {
    socket.on('disconnect', function() {

        models.User.findOne({where: {id: socket.userId}})
            .then(user => {
                user.online = false;
                user.save();
            });

        socket.broadcast.emit('newUserOffline', socket.userId);

    });
});

//Selecting new chats
io.on('connection', function(socket) {

    socket.on('room', function(room) {
        socket.join(room);

        console.log("Now in room: " + room);

        let chat = models.selectChatTable(room);

        models.sequelize.sync()
            .then(() => {
                console.log("New table (chat) has been created");
            })
            .catch((err) => {
                console.log("Error while creating table/chat: ", err);
            });

        chat.findAll()
            .then((msgs) => {

                socket.emit('getHistory', msgs);
            });

    });

});

//Sending msgs to receivers
io.on('connection', function(socket) {

    socket.on('message', function(msg) {

        var room = "" + msg.chatId;

        let chat = models.selectChatTable(room);

        let newMsg = chat.build({
            author: msg.author,
            date: msg.date,
            message: msg.message,
            read: false,
            thread: msg.thread,
        });

        newMsg.save();

        models.UnreadMessages.findOne({
            where: {
                chat: room,
                authorId: {
                    $eq: parseInt(msg.author),
                },
            },
        }).then(row => {
            if (row) {
                console.log(row.nMessages);
                row.nMessages++;
                row.save();

            } else {
                models.UnreadMessages.build({
                    authorId: msg.author,
                    chat: room,
                    nMessages: 1,
                }).save();

            }
            socket.broadcast.to(room).emit('new unread msg', room);

        });

        socket.broadcast.to(room).emit('chat message', msg);

    });
});

//Remove notifications function
io.on('connection', function(socket) {

    socket.on('remove notifications', function(room) {

        models.UnreadMessages.findOne({
            where: {
                chat: room,
                authorId: {
                    $ne: socket.userId,
                },
            },

        }).then(row => {
            if (row !== null) {
                row.destroy();
            }

        });
    });
});

//Typing function
io.on('connection', function(socket) {

    socket.on('typing', function(details) {

        var room = "" + details.chat;

        socket.broadcast.to(room).emit('typing', details);

    });
});

let port = process.env.PORT || '4000';
//Server listening
server.listen(port, function() {
    console.log('listening on *:' + port);
});
