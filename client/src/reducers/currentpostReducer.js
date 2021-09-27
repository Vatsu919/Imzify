
import {CANCEL_FETCH, FETCH_ONE} from '../constants/index.js'

const currentpostReducer = (state=null,action) => {
    switch(action.type){
        case FETCH_ONE:
            console.log("in redux post: ",action.payload);
            return action.payload;

        case CANCEL_FETCH:
            return null;

        default:
            return state;
    }


}

export default currentpostReducer;