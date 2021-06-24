import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchLobbyCategoriesRequest = () => {
    return dispatch => {
        return callApi('lobbycategory', 'GET', null).then(function (res) {
            dispatch(actFetchLobbyCategories(res.data));
        });
    };
}

export const actFetchLobbyCategories = (lobbyCategories) => {
    return {
        type : Types.FETCH_LOBBYCATEGORIES,
        lobbyCategories
    }
}
export const actGetLobbyCategoryRequest = (id) => {
    return dispatch => {
        return callApi(`lobbycategory/${id}`, 'GET', null).then(res => {
            dispatch(actGetLobbyCategory(res.data));
        });
    }
}

export const actGetLobbyCategory = (lobbyCategory) => {
    return {
        type : Types.EDIT_LOBBYCATEGORY,
        lobbyCategory
    }
}

export const actUpdateLobbyCategoryRequest = (lobbyCategory) => {
    return dispatch => {
        return callApi(`lobbycategory/${lobbyCategory.id}`, 'PUT', lobbyCategory).then(res => {
            dispatch(actUpdateLobbyCategory(res.data));
        });
    }
}

export const actUpdateLobbyCategory = (lobbyCategory) => {
    return {
        type : Types.UPDATE_LOBBYCATEGORY,
        lobbyCategory
    }
}


export const actDeleteLobbyCategoryRequest = (id) => {
    return dispatch => {
        return callApi(`lobbycategory/${id}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteLobbyCategory(id));
        })
    }
}

export const actDeleteLobbyCategory = (id) => {
    return {
        type : Types.DELETE_LOBBYCATEGORY,
        id
    }
}

export const actAddLobbyCategoryRequest = (lobbyCategory) => {
    console.log('request')
    console.log(lobbyCategory)
    return dispatch => {
        return callApi('lobbycategory', 'POST', lobbyCategory).then(res => {
            if (res)
                dispatch(actAddLobbyCategory(res.data));
        });
    }
}

export const actAddLobbyCategory = (lobbyCategory) => {
    return {
        type : Types.ADD_LOBBYCATEGORY,
        lobbyCategory
    }
}