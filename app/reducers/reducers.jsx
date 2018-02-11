import {combineReducers} from 'redux';
import initialReducer from './initialReducer'


let GlobalState = combineReducers({
    initialState: initialReducer,
});

export default GlobalState;