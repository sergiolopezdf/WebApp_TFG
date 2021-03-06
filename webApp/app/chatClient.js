import io from 'socket.io-client';

// let socket = io(process.env.CHAT_SERVER_URL + ':' + process.env.CHAT_SERVER_PORT + '/chat');
let socket = null;

function setSocket(chatServerURL, chatServerPort) {
    socket = io(chatServerURL + ':' + chatServerPort + '/chat');
}



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

function receivedNotification(callback) {
    socket.on('new unread msg', chatId => {
        callback(chatId);
    });
}

function removeNotifications(chatId) {
    socket.emit('remove notifications', chatId);
}

function newUserOnline(callback) {
    socket.on('newUserOnline', userId => {
        callback(userId);
    });
}

function newUserOffline(callback) {
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

function getInitialNotifications(callback) {

    socket.on('get initial notifications', notifications => {
        callback(notifications);
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
    receivedNotification,
    removeNotifications,
    getInitialNotifications,
    setSocket,
};

