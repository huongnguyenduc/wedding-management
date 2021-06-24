import * as Types from '../constants/ActionTypes';

var initialState = {};

const lobbyCategoryItem = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_LOBBYCATEGORY:
            state = action.lobbyCategory;
            return state;
        default:
            return state;
    }
}

export default lobbyCategoryItem;
