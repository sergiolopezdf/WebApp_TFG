// Sends the message down to the backend of the app
export function newMessage(msg) {
    //console.log(msg);
    return {
        type: 'NEW_MESSAGE',
        msg: msg,
    };
}
