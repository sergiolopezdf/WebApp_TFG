// Sends the message down to the backend of the app
export function newMessage(msg) {
    // console.log(msg);
    return {
        type: 'NEW_MESSAGE',
        msg: msg,
    };
}

export function setChatHistory(fullChat, room) {
    return {
        type: 'UPDATE_CHAT_HISTORY',
        chatMsgs: fullChat,
        chatId: room
    };
}

export function setUser(user) {
    return {
        type: 'SET_USER',
        user: user,
    };
}

export function setCurrentChat(chatId, username) {
    return {
        type: 'SET_CURRENT_CHAT',
        chatId: chatId,
        username: username
    };

}

export function userTyping(bool, chatId) {
    return {
        type: 'USER_TYPING',
        chatId: chatId,
        typing: bool,
    };

}

export function setNewUserOnline(userId) {
    return {
        type: "SET_NEW_USER_ONLINE",
        userId: userId,
    };
}

export function setNewUserOffline(userId) {
    return {
        type: "SET_NEW_USER_OFFLINE",
        userId: userId,
    };
}

export function setRemoteUsersTyping(details) {
    return {
        type: 'REMOTE_USER_TYPING',
        chat: details.chat,
        typing: details.typing,
        userId: details.userId,
    };
}

export function showChat(bool) {
    return {
        type: 'SHOW_CHAT',
        dismiss: bool,

    };
}

export function setNews(news) {
    return {
        type: 'SET_NEWS',
        news: news
    }

}

export function deleteAlerts() {
    return {
        type: 'DELETE_ALERTS',
    }
}

export function newAlert(msg) {
    return {
        type: 'NEW_ALERT',
        msg: msg
    }

}
