import { CLEAR_SELECTEDUSER_POSTS, FETCH_SELECTEDUSER_POSTS } from "../constants";

const selecteduserpostsReducer = (state = [],action) => {
    switch(action.type){
        case FETCH_SELECTEDUSER_POSTS:
            return action.payload;
        
        case CLEAR_SELECTEDUSER_POSTS:
            return [];
        
        default:
            return state;
    }
}
export default selecteduserpostsReducer;