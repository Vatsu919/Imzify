import {AUTH, LOGOUT,IS_LOGGED_IN} from '../constants/index.js';

const authReducer = (state = {authData:null,isLoggedIn: false},action) => {
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state,authData: action?.data,isLoggedIn:true};
            
        case LOGOUT:
            localStorage.removeItem('profile');
            return {authData:null,isLoggedIn:false};

        case IS_LOGGED_IN:
            return {...state,authData: JSON.parse(localStorage.getItem('profile')),isLoggedIn:true};

        default:
            return state;

    }
}

export default authReducer;