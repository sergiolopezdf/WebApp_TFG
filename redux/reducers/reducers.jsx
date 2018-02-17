import {combineReducers} from 'redux';

let initialState = {
    chat: {},
    modules: {
        chat: true
    }
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


let GlobalState = combineReducers({
    chat: newMessage,
    renderModules: renderModules
});

export default GlobalState;