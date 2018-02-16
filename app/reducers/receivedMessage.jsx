import {RECEIVEDMESSAGE} from "../constants/constants";


function receivedMessage(state = RECEIVEDMESSAGE, action) {
    switch (action.type) {
        case 'RECEIVED_MESSAGE':
            return action.msg;
        default:
            return state;

    }
}

export default receivedMessage;