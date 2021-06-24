import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchLobbiesRequest = () => {
    return dispatch => {
        return callApi('lobby', 'GET', null).then(function (res) {
            if (res)
                dispatch(actFetchLobbies(res.data));
            else
                dispatch(actFetchLobbies([]));
        });
    };
}

export const actFetchLobbies = (lobbies) => {
    return {
        type : Types.FETCH_LOBBIES,
        lobbies
    }
}
export const actGetLobbyRequest = (id) => {
    return dispatch => {
        return callApi(`lobby/${id}`, 'GET', null).then(res => {
            if (res)
                dispatch(actGetLobby(res.data));
            else 
                dispatch(actGetLobby({}));
        });
    }
}


export const actGetLobby = (lobby) => {
    return {
        type : Types.EDIT_LOBBY,
        lobby
    }
}

export const actUpdateLobbyRequest = (lobby) => {
    return dispatch => {
        return callApi(`lobby/${lobby.id}`, 'PUT', lobby).then(res => {
            dispatch(actUpdateLobby(res.data));
        });
    }
}

export const actUpdateLobby = (lobby) => {
    return {
        type : Types.UPDATE_LOBBY,
        lobby
    }
}


export const actDeleteLobbyRequest = (id) => {
    return dispatch => {
        return callApi(`lobby/${id}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteLobby(id));
        })
    }
}

export const actDeleteLobby = (id) => {
    return {
        type : Types.DELETE_LOBBY,
        id
    }
}

export const actAddLobbyRequest = (lobby) => {
    console.log('request')
    console.log(lobby)
    return dispatch => {
        return callApi('lobby', 'POST', lobby).then(res => {
            if (res)
                dispatch(actAddLobby(res.data));
        });
    }
}

export const actAddLobby = (lobby) => {
    return {
        type : Types.ADD_LOBBY,
        lobby
    }
}