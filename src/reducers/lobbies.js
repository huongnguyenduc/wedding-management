import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (lobbies, id) => {
    var result = -1;
    lobbies.forEach((lobby, index) => {
        if (lobby.id === id) {
            result = index;
        }
    });
    return result;
}

const lobbies = (state = initialState, action) => {
    var index = -1;
    var { id, lobby } = action;
    switch (action.type) {
        case Types.FETCH_LOBBIES:
            console.log("fetchLobbies")
            state = action.lobbies;
            return [...state];
        case Types.DELETE_LOBBY:
            console.log("deleteLobby")
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_LOBBY:
            console.log("addLobby")
            state.push(action.lobby);
            return [...state];
        case Types.UPDATE_LOBBY:
            console.log("updateLobby")
            index = findIndex(state, lobby.id);
            state[index] = lobby;
            return [...state];
        default: return [...state];
    }
};

export default lobbies;