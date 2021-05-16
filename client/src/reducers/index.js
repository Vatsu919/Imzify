import {combineReducers} from 'redux';
import posts from './postReducer.js';
import user from './authReducers.js';
import flashmessage from './flashMessageReducer.js';

export default combineReducers({
    posts,
    user,
    flashmessage
});