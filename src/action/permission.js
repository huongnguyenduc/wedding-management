import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actFetchPermissionsRequest = () => {
    return dispatch => {
        return callApi('permission/ROLE_ADMIN', 'GET', null).then(function (res) {
            if (res) {
                dispatch(actFetchPermissions(res.data));
            }
            else {
                dispatch(actFetchPermissions([]));
            }
        });
    };
}

export const actFetchPermissions = (permissions) => {
    return {
        type : Types.FETCH_PERMISSIONS,
        permissions
    }
}

export const actDeletePermissionRequest = (permission, removePermission) => {
    return dispatch => {
        return callApi(`permission/remove?rolename=${permission.rolename}&permission=${permission.permission}`, 'PUT', null).then(res =>{
            if (res)
                removePermission();
        })
    }
}

export const actDeletePermission = (id) => {
    return {
        type : Types.DELETE_PERMISSION,
        id
    }
}

export const actAddPermissionRequest = (permission, updatePermission) => {
    console.log('request')
    console.log(permission)
    return dispatch => {
        return callApi(`permission/add?rolename=${permission.rolename}&permission=${permission.permission}`, 'PUT', null,).then(res => {
            if (res)
                updatePermission();
        });
    }
}

export const actAddPermission = (permission,) => {
    return {
        type : Types.ADD_PERMISSION,
        permission
    }
}

export const actGetPermissionRequest = (id) => {
    console.log("permission " + id)
    return dispatch => {
        return callApi(`permission/${id}`, 'GET', null).then(res => {
            dispatch(actGetPermission(res.data));
        });
    }
}

export const actGetPermission = (permission) => {
    return {
        type : Types.EDIT_PERMISSION,
        permission
    }
}

export const actUpdatePermissionRequest = (permission) => {
    return dispatch => {
        return callApi(`permission/${permission.id}`, 'PUT', permission).then(res => {
            dispatch(actUpdatePermission(res.data));
        });
    }
}

export const actUpdatePermission = (permission) => {
    return {
        type : Types.UPDATE_PERMISSION,
        permission
    }
}
