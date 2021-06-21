import * as Types from '../constants/ActionTypes';
var initialState = [];

// var findIndex = (permissions, id) => {
//     var result = -1;
//     permissions.forEach((permission, index) => {
//         if (permission.id === id) {
//             result = index;
//         }
//     });
//     return result;
// }

const permissions = (state = initialState, action) => {
    // var index = -1;
    // var { id, permission } = action;
    switch (action.type) {
        case Types.FETCH_PERMISSIONS:
            console.log("fetchpermission")
            state = action.permissions;
            return state;
        // case Types.DELETE_PERMISSION:
        //     console.log("deletepermission")
        //     index = findIndex(state, id);
        //     state.splice(index, 1);
        //     return [...state];
        // case Types.ADD_PERMISSION:
        //     console.log("addpermission")
        //     state.push(action.permission);
        //     return [...state];
        // case Types.UPDATE_PERMISSION:
        //     console.log("updatepermission")
        //     index = findIndex(state, permission.id);
        //     state[index] = permission;
        //     return [...state];
        default: 
            return state;
    }
};

export default permissions;