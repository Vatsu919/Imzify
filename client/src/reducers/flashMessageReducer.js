import {FLASH_MESSAGE, REMOVE_FLASH_MESSAGE} from '../constants/index.js';

export default (state = {message:null,mtype:null},action ) => {
    switch(action.type)
    {
        case FLASH_MESSAGE:
            return action.payload;
        
        case REMOVE_FLASH_MESSAGE:
            return {message:null,mtype:null};
        
        default:
            return state;
            
    }

} 