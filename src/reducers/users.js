import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (users, id) => {
    var result = -1;
    users.forEach((user, index) => {
        if (user.id === id) {
            result = index;
        }
    });
    return result;
}

const users = (state = initialState, action) => {
    var index = -1;
    var { id, user } = action;
    switch (action.type) {
        case Types.FETCH_USERS:
            console.log("fetchuser")
            state = action.users;
            return [...state];
        case Types.DELETE_USER:
            console.log("deleteuser")
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_USER:
            console.log("adduser")
            state.push(action.user);
            return [...state];
        case Types.UPDATE_USER:
            console.log("updateuser")
            index = findIndex(state, user.id);
            state[index] = user;
            return [...state];
        default: 
            return [...state];
    }
};

export default users;