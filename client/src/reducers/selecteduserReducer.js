import { DESELECT_USER, SELECT_USER } from "../constants";

const selecteduserReducer = (state=null,action) => {
    switch(action.type){
        case SELECT_USER:
            return action.payload;
        
        case DESELECT_USER:
            return null;
        
        default:
            return state;
    }
}
export default selecteduserReducer;