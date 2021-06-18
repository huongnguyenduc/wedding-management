import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (shifts, id) => {
    var result = -1;
    shifts.forEach((shift, index) => {
        if (shift.id === id) {
            result = index;
        }
    });
    return result;
}

const shifts = (state = initialState, action) => {
    var index = -1;
    var { id, shift } = action;
    switch (action.type) {
        case Types.FETCH_SHIFTS:
            console.log("fetchShift")
            state = action.shifts;
            return [...state];
        case Types.DELETE_SHIFT:
            console.log("deleteShift")
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_SHIFT:
            console.log("addShift")
            state.push(action.shift);
            return [...state];
        case Types.UPDATE_SHIFT:
            console.log("updateShift")
            index = findIndex(state, shift.id);
            state[index] = shift;
            return [...state];
        default: return [...state];
    }
};

export default shifts;