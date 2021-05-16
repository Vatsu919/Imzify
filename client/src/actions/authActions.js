import * as api from '../api/index.js';
import {AUTH, FLASH_MESSAGE} from '../constants/index.js';

export const signin = (formData,history) => async (dispatch) => {
    try {
        const {data} = await api.signin(formData);
        console.log(data);
        dispatch({type:FLASH_MESSAGE,payload:{message:'Successfully Logged in',mtype:'success'}})
        dispatch({type:AUTH,data});
        history.push('/');
    } catch (error) {
        dispatch({type:FLASH_MESSAGE,payload:{message:'Error while Logging in',mtype:'failure'}})
        console.log(error);
    }
}


export const signup = (formData,history) => async (dispatch) => {
    try {
        const {data} = await api.signup(formData);
        console.log(data);
        dispatch({type:FLASH_MESSAGE,payload:{message:'Successfully Signed in',mtype:'success'}})
        dispatch({type:AUTH,data});
        history.push('/');
    } catch (error) {
        console.log(error);
        dispatch({type:FLASH_MESSAGE,payload:{message:'Error while signing in',mtype:'failure'}})
    }
}