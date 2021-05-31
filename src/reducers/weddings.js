import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (weddings, id) => {
    var result = -1;
    weddings.forEach((wedding, index) => {
        if (wedding.id === id) {
            result = index;
        }
    });
    return result;
}

const weddings = (state = initialState, action) => {
    var index = -1;
    var { id, wedding } = action;
    switch (action.type) {
        case Types.FETCH_WEDDINGS:
            console.log("fetchWedding")
            state = action.weddings;
            return [...state];
        case Types.DELETE_WEDDING:
            console.log("deleteWedding")
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_WEDDING:
            console.log("addWedding")
            state.push(action.wedding);
            return [...state];
        case Types.UPDATE_WEDDING:
            console.log("updateWedding")
            index = findIndex(state, wedding.id);
            state[index] = wedding;
            return [...state];
        default: return [...state];
    }
};

export default weddings;