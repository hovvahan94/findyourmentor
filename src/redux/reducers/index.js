import user from './user';
import employers from './employers';
import {combineReducers} from 'redux';
import {firebaseReducer} from "react-redux-firebase";

const rootReducer = combineReducers({
    employers,
    firebase: firebaseReducer
})

export default rootReducer;