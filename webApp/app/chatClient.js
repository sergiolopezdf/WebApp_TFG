import io from 'socket.io-client';

let socket = io('http://localhost:4000/chat');

function openChat(room, callback) {

    socket.emit('room', room);

    socket.on('getHistory', fullChat => {
        callback(fullChat);
    });

}

function openConnection(myUserId) {

    socket.emit('newUser', myUserId);
}

function sendMessage(msg) {
    socket.emit('message', msg);

}

function receivedMessage(callback) {
    socket.on('chat message', msg => {
        callback(msg);
    });

}

function newUserOnline(callback) {
    socket.on('newUserOnline', userId => {
        callback(userId);
    });
}

function newUserOffline(callback) {
    console.log("entro");
    socket.on('newUserOffline', userId => {
        callback(userId);
    });

}

function userIsTyping(bool, chat, userId) {

    let details = {
        chat: chat,
        userId: userId,
        typing: bool,
    };

    socket.emit('typing', details);
}

function remoteUserIsTyping(callback) {

    socket.on('typing', details => {
        callback(details);
    });

}

export {
    openConnection,
    openChat,
    sendMessage,
    receivedMessage,
    userIsTyping,
    remoteUserIsTyping,
    newUserOnline,
    newUserOffline,
};

