import { CLEAR_SELECTEDUSER_POSTS, FETCH_SELECTEDUSER_POSTS, REMOVE_SELECTEDUSER_POST } from "../constants";

const selecteduserpostsReducer = (state = [],action) => {
    switch(action.type){
        case FETCH_SELECTEDUSER_POSTS:
            return action.payload;
        
        case CLEAR_SELECTEDUSER_POSTS:
            return [];
        
        case REMOVE_SELECTEDUSER_POST:
            return state.filter(post => post._id!==action.payload);

        default:
            return state;
    }
}
export default selecteduserpostsReducer;