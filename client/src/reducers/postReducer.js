import {FETCH_ALL,CREATE_POST,LIKE_POST, COMMENT_POST} from '../constants/index.js';

const postReducer = (state = [],action) => {
    switch(action.type)
    {
        case FETCH_ALL:
            console.log(action.payload);
            return action.payload;
        
        case CREATE_POST:
            return [...state,action.payload];

        case LIKE_POST:
            return state.map(post => (post._id===action.payload._id) ? action.payload : post);

        case COMMENT_POST:
            console.log(action.payload);
            return state.map(post => (post._id===action.payload._id)? action.payload:post);
        
        default:
            return state;

    }

}

export default postReducer;