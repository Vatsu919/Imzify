import { IDLE, SUCCEEDED, UPDATED } from "../constants"


const poststatusReducer = (state=IDLE,action) => {
    switch(action.type){
        case UPDATED:
            return UPDATED;
        
        case SUCCEEDED:
            return SUCCEEDED;

        case IDLE:
            return IDLE;
        default:
            return state;
    }
}
export default poststatusReducer;