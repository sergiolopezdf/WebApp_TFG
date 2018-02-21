import io from 'socket.io-client';

let socket = io('http://localhost:4000/chat');

function openChat(room, callback) {

    socket.emit('room', room);

    socket.on('getHistory', fullChat => {
        callback(fullChat);
    })

}


//IT NEEDS TO BE AN INTEGER!!!!!!!!!
function openConnection(myUserId) {

    socket.emit('newUser', myUserId);

}

function getUsersOnline(callback) {

    socket.on('getUsersOnline', users => {
        callback(users);
        //console.log(users);
    })

}

function sendMessage(msg) {
    socket.emit('message', msg);

}

function receivedMessage(callback) {
    socket.on('chat message', msg => {
        callback(msg);
    });

}


export {openConnection, openChat, sendMessage, receivedMessage, getUsersOnline};

