// Sends the message down to the backend of the app
export function newMessage(msg) {
    //console.log(msg);
    return {
        type: 'NEW_MESSAGE',
        msg: msg,
    };
}

export function setUserId(id) {
    return {
        type: 'SET_USER_ID',
        id: id,
    };
}

export function setCurrentChat(chatId) {
    return {
        type: 'SET_CURRENT_CHAT',
        chatId: chatId,
    };

}

export function setOnlineUsers(onlineUsers) {
    return {
        type: 'SET_ONLINE_USERS',
        users: onlineUsers,
    };

}

