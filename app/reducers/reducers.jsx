import {combineReducers} from 'redux';
import sendMessage from './sendMessage'
import receivedMessage from "./receivedMessage";


let GlobalState = combineReducers({
    sendMessage: sendMessage,
    receivedMessage: receivedMessage
});

export default GlobalState;