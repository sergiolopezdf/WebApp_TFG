import io from 'socket.io-client';

var socket = io('http://localhost:4000/chat');
var id = "1_2";

function openConnection() {
    console.log("new room");
    socket.emit('room', id);
}

function sendMessage(msg) {
    socket.emit('message', msg);

}

function receivedMessage(callback) {
    socket.on('chat message', msg => {
        callback(msg);
    });

}

export {openConnection, sendMessage, receivedMessage}


