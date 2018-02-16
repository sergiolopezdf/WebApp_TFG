import {SENDMESSAGE} from "../constants/constants";


function sendMessage(state = SENDMESSAGE, action) {
    switch (action.type) {
        case 'SEND_MESSAGE':
            return action.msg;
        default:
            return state;

    }
}

export default sendMessage;