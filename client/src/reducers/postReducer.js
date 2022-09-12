import {FETCH_ALL,CREATE_POST,LIKE_POST, COMMENT_POST, REMOVE_POST} from '../constants/index.js';

const postReducer = (state = [],action) => {
    switch(action.type)
    {
        case FETCH_ALL:
            console.log(action.payload);
            return action.payload;
        
        case CREATE_POST:
            return [action.payload,...state];

        case LIKE_POST:
            return state.map(post => (post._id===action.payload._id) ? action.payload : post);

        case REMOVE_POST:
            console.log("action payload:   ",action.payload);
            return state.filter(post => post._id!==action.payload);

        case COMMENT_POST:
            console.log(action.payload);
            return state.map(post => (post._id===action.payload._id)? action.payload:post);
        
        default:
            return state;

    }

}

export default postReducer;