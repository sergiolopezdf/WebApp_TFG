// Sends the message down to the backend of the app
export function sendMessage(msg) {
    return {
        type: 'SEND_MESSAGE',
        msg: msg,
    };
}

// Sends the message up to the frontend of the app
export function receivedMessage(msg) {
    return {
        type: 'RECEIVED_MESSAGE',
        msg: msg,
    };
}