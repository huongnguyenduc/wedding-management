import * as Types from './../constants/ActionTypes';

var initialState = {};

const userItem = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_USER:
            state = action.user;
            return state;
        default:
            return state;
    }
}

export default userItem;
