import {combineReducers} from 'redux';

let initialState = {
    chat: {},
    chatNotifications: {},
    modules: {
        chat: false,
    },
    currentChat: null,
    myself: null,
    remoteUsers: null,
    remoteUsersTyping: {},
    userTyping: {
        typing: false,
        chat: null,
    },
    news: null,
    alertMessages: null,
    availableVideos: null,
    currentVideo: null,
};

function chatUpdate(state = initialState.chat, action) {
    switch (action.type) {
        case 'NEW_MESSAGE':
            let newChat = JSON.parse(JSON.stringify(state));

            if (newChat[action.msg.chatId] === undefined) {
                newChat[action.msg.chatId] = [action.msg];
            } else {
                newChat[action.msg.chatId].splice(0, 0, action.msg);
            }

            return newChat;

        case 'UPDATE_CHAT_HISTORY':
            let chatUpdate = JSON.parse(JSON.stringify(state));

            chatUpdate[action.chatId] = action.chatMsgs;

            return chatUpdate;

        default:
            return state;

    }
}

function chatNotification(state = initialState.chatNotifications, action) {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            let newNotification = JSON.parse(JSON.stringify(state));

            if (newNotification[action.chatId] === undefined) {
                newNotification[action.chatId] = 1;
            } else {
                newNotification[action.chatId]++;
            }

            return newNotification;

        case 'CLEAN_NOTIFICATIONS':
            let newNotification2 = JSON.parse(JSON.stringify(state));

            newNotification2[action.chatId] = 0;

            return newNotification2;

        case 'SET_INITIAL_NOTIFICATIONS':
            let newNotification3 = JSON.parse(JSON.stringify(state));
            newNotification3[action.chatId] = action.nMsgs;
            return newNotification3;



        default:
            return state;

    }
}

function setRemoteUsers(state = initialState.remoteUsers, action) {
    switch (action.type) {
        case 'SET_NEW_USER_ONLINE':
            let newState = JSON.parse(JSON.stringify(state));

            newState.map((user, index) => {
                if (action.userId === user.id) {
                    user.online = true;
                }
            });

            return newState;

        case 'SET_NEW_USER_OFFLINE':
            let newState2 = JSON.parse(JSON.stringify(state));

            newState2.map((user, index) => {
                if (action.userId === user.id) {
                    user.online = false;
                }
            });

            return newState2;

        default:
            return state;

    }
}

function alertManager(state = initialState.alertMessages, action) {
    switch (action.type) {
        case 'DELETE_ALERTS':
            let newState = JSON.parse(JSON.stringify(state));
            newState = false;
            return newState;

        case 'NEW_ALERT':
            let newState2 = JSON.parse(JSON.stringify(state));
            newState2 = action.msg;
            return newState2;
        default:
            return state;

    }

}

function setNews(state = initialState.news, action) {
    switch (action.type) {
        case 'SET_NEWS':
            let newState = JSON.parse(JSON.stringify(state));
            newState = action.news;
            return newState;
        default:
            return state;

    }

}

function renderModules(state = initialState.modules, action) {
    switch (action.type) {
        case 'SHOW_CHAT':
            let newState = JSON.parse(JSON.stringify(state));
            newState.chat = action.dismiss;
            return newState;

        default:
            return state;

    }
}

function setCurrentVideo(state = initialState.currentVideo, action) {
    switch (action.type) {
        case 'SET_CURRENT_VIDEO':
            let newState = JSON.parse(JSON.stringify(state));
            newState = action.video;
            return newState;
        default:
            return state;

    }
}

function setUser(state = initialState.myself, action) {
    switch (action.type) {
        case 'SET_USER':
            return action.user;
        default:
            return state;

    }
}

function setCurrentChat(state = initialState.currentChat, action) {
    switch (action.type) {
        case 'SET_CURRENT_CHAT':
            let newState = JSON.parse(JSON.stringify(state));

            newState = {
                chatId: action.chatId,
                username: action.username,
            };
            return newState;

        default:
            return state;

    }
}

function isUserTyping(state = initialState.userTyping, action) {
    switch (action.type) {
        case 'USER_TYPING':

            let newState = JSON.parse(JSON.stringify(state));

            newState.chatId = action.chatId;
            newState.typing = action.typing;

            return newState;
        default:
            return state;

    }
}

function setAvailableVideos(state = initialState.availableVideos, action) {
    switch (action.type) {
        case 'SET_AVAILABLE_VIDEOS':

            let newState = JSON.parse(JSON.stringify(state));
            newState = action.videos;
            return newState;

        default:
            return state;

    }
}

function remoteUsersTyping(state = initialState.remoteUsersTyping, action) {

    switch (action.type) {
        case 'REMOTE_USER_TYPING':

            // console.log(action);

            let newState = JSON.parse(JSON.stringify(state));

            newState[action.chat] = {
                chat: action.userId,
                typing: action.typing,

            };

            return newState;

        default:
            return state;

    }

}

let GlobalState = combineReducers({
    chat: chatUpdate,
    chatNotifications: chatNotification,
    modules: renderModules,
    myself: setUser,
    currentChat: setCurrentChat,
    userTyping: isUserTyping,
    remoteUsers: setRemoteUsers,
    remoteUsersTyping: remoteUsersTyping,
    news: setNews,
    alertMessages: alertManager,
    availableVideos: setAvailableVideos,
    currentVideo: setCurrentVideo,
});

export default GlobalState;
