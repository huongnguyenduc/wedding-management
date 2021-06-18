import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCallerTest';

export const actFetchUsersRequest = () => {
    return dispatch => {
        return callApi('user', 'GET', null).then(function (res) {
            if (res) {
                dispatch(actFetchUsers(res.data));
            }
            else {
                dispatch(actFetchUsers([]));
            }
        });
    };
}

export const actFetchUsers = (users) => {
    return {
        type : Types.FETCH_USERS,
        users
    }
}

export const actDeleteUserRequest = (id) => {
    return dispatch => {
        return callApi(`user/${id}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteUser(id));
        })
    }
}

export const actDeleteUser = (id) => {
    return {
        type : Types.DELETE_USER,
        id
    }
}

export const actAddUserRequest = (user) => {
    console.log('request')
    console.log(user)
    return dispatch => {
        return callApi('user', 'POST', user).then(res => {
            if (res)
                dispatch(actAddUser(res.data));
        });
    }
}

export const actAddUser = (user) => {
    return {
        type : Types.ADD_USER,
        user
    }
}

export const actGetUserRequest = (id) => {
    return dispatch => {
        return callApi(`user/${id}`, 'GET', null).then(res => {
            dispatch(actGetUser(res.data));
        });
    }
}

export const actGetUser = (user) => {
    return {
        type : Types.EDIT_USER,
        user
    }
}

export const actUpdateUserRequest = (user) => {
    return dispatch => {
        return callApi(`user/${user.id}`, 'PUT', user).then(res => {
            dispatch(actUpdateUser(res.data));
        });
    }
}

export const actUpdateUser = (user) => {
    return {
        type : Types.UPDATE_USER,
        user
    }
}
