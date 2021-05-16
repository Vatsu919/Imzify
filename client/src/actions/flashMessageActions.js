import {FLASH_MESSAGE} from '../constants/index.js';

export const sendflashmessage = (message,mtype) => {

    return {
        type: FLASH_MESSAGE,
        payload: {
            message,
            mtype
        }
    }

}