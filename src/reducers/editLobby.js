import * as Types from './../constants/ActionTypes';

var initialState = {};

const lobbyItem = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_LOBBY:
            state = action.lobby;
            return state;
        default:
            return state;
    }
}

export default lobbyItem;
