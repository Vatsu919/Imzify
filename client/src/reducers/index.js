import {combineReducers} from 'redux';
import posts from './postReducer.js';
import user from './authReducers.js';
import flashmessage from './flashMessageReducer.js';
import post from './currentpostReducer.js';
import poststatus from './poststatusReducer.js';
import selecteduserposts from './selecteduserpostsReducer.js';
import selecteduser from './selecteduserReducer';

export default combineReducers({
    posts,
    user,
    flashmessage,
    post,
    poststatus,
    selecteduser,
    selecteduserposts
});