// Sends the message down to the backend of the app
export function newMessage(msg) {
    // console.log(msg);
    return {
        type: 'NEW_MESSAGE',
        msg: msg,
    };
}

export function setChatHistory(fullChat) {
    return {
        type: 'UPDATE_CHAT_HISTORY',
        chat: fullChat,
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

export function userTyping(bool, chat) {
    return {
        type: 'USER_TYPING',
        chat: chat,
        typing: bool,
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
