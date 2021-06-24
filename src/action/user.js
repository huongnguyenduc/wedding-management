import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actFetchUsersRequest = () => {
    return dispatch => {
        return callApi('user/get-all', 'GET', null).then(function (res) {
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

export const actDeleteUserRequest = (username, deleteSuccess, deleteFailure) => {
    return dispatch => {
        return callApi(`user/delete/${username}`, 'DELETE', null).then(res =>{
            if (res) {
                dispatch(actFetchUsersRequest());
                deleteSuccess();
            } else {
                deleteFailure();
            }
        })
    }
}

export const actDeleteUser = (id) => {
    return {
        type : Types.DELETE_USER,
        id
    }
}

export const actAddUserRequest = (user, addSuccess, addFailure) => {
    return dispatch => {
        if (user.image) {
            uploadImage(user.image).then(
                (res)=>{
                    if (!res) {
                        addFailure();
                    }
                    return res.json()
            }).then(
                (res) => {
                    const data ={
                        id: user.id,
                        fullname: user.fullname,
                        username: user.username,
                        image: res.url,
                        role: user.role,
                        password: user.password
                    }
                    callApi('user/sign-up', 'POST', data).then(res => {
                        if (!res) {
                            addFailure();
                        }
                        else {
                            dispatch(actFetchUsersRequest());
                            addSuccess();
                        }
                    });
                }
            )
        }
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

export const actUpdateUserRequest = (user, updateSuccess, updateFailure) => {
    return dispatch => {
        if (user.newImage) {
            uploadImage(user.newImage).then(
                (res)=>{
                    if(!res)
                        updateFailure();
                    return res.json()
            }).then(
                (res) => {
                    const data ={
                        id: user.id,
                        fullname: user.fullName,
                        username: user.username,
                        image: res.url,
                        role: user.role,
                        password: user.password
                    }
                    callApi('user/update', 'PUT', data).then(res => {
                        if (res) {
                            dispatch(actFetchUsersRequest());
                            updateSuccess();
                        }
                        else {
                            updateFailure();
                        }
                    });
                }
            )
        } else {
            const data ={
                        id: user.id,
                        fullname: user.fullName,
                        username: user.username,
                        image: user.image,
                        role: user.role,
                        password: user.password
                    }
                    callApi('user/update', 'PUT', data).then(res => {
                        if(!res) {
                            updateFailure();
                        } else {
                            dispatch(actFetchUsersRequest());
                            updateSuccess();
                        }
                    });
        }
    }
}

export const actUpdateUser = (user) => {
    return {
        type : Types.UPDATE_USER,
        user
    }
}

export function uploadImage(image)
{
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "wedding")
    data.append("folder",'user_image')
    var url = "https://api.cloudinary.com/v1_1/huong/image/upload"
    var option = {
        method: 'POST',
        body: data
    }
    return fetch(url, option)
}
