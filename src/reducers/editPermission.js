import * as Types from './../constants/ActionTypes';

var initialState = {};

const permissionItem = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_PERMISSION:
            state = action.permission;
            return state;
        default:
            return state;
    }
}

export default permissionItem;
