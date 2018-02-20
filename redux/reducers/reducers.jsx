import {combineReducers} from 'redux';

let initialState = {
    chat: {},
    modules: {
        chat: true
    },
    currentChat: null,
    myUserId: null,
    onlineUsers: []
}


function newMessage(state = initialState.chat, action) {
    switch (action.type) {
        case 'NEW_MESSAGE':
            let newChat = JSON.parse(JSON.stringify(state));

            if (newChat[action.msg.chat] === undefined) {
                newChat[action.msg.chat] = [action.msg];
            } else {
                newChat[action.msg.chat].push(action.msg);
            }

            return newChat;

        default:
            return state;

    }
}


function renderModules(state = initialState.modules, action) {
    switch (action.type) {
        case 'RENDER_MODULES':
            return action.modules;
        default:
            return state;

    }
}

function setUserId(state = initialState.myUserId, action) {
    switch (action.type) {
        case 'SET_USER_ID':
            return action.id;
        default:
            return state;

    }
}


function setCurrentChat(state = initialState.currentChat, action) {
    switch (action.type) {
        case 'SET_CURRENT_CHAT':
            return action.chatId;
        default:
            return state;

    }
}


function setOnlineUsers(state = initialState.onlineUsers, action) {

    switch (action.type) {
        case 'SET_ONLINE_USERS':

            let newState = JSON.parse(JSON.stringify(state));

            newState = action.users;


            return newState;
        default:
            return state;

    }
}


let GlobalState = combineReducers({
    chat: newMessage,
    modules: renderModules,
    userId: setUserId,
    currentChat: setCurrentChat,
    onlineUsers: setOnlineUsers
});

export default GlobalState;