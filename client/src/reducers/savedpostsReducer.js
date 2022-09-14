import { ADD_TO_SAVED_POSTS, GET_SAVED_POSTS, REMOVE_FROM_SAVED_POSTS } from "../constants";


const savedpostsReducer = (state=[],action) => {
    switch(action.type)
    {
        case GET_SAVED_POSTS:
            return action.payload;

        case ADD_TO_SAVED_POSTS:
            return [action.payload,...state];
        
        case REMOVE_FROM_SAVED_POSTS:
            return state.filter(spost => spost._id!==action.payload._id);

        default:
            return state;
    }
}

export default savedpostsReducer;