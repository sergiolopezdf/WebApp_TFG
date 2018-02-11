
import {INITIALSTATE} from "../constants/constants";


function initialReducer(state = INITIALSTATE, action) {
    switch (action.type) {
        case 'INITIAL_STATE':
            return action.type;
        default:
            return state;

    }
}

export default initialReducer;