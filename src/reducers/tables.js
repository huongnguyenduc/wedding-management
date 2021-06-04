import * as Types from '../constants/ActionTypes';
var initialState = [];

const tables = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_TABLES:
            console.log("fetchTables")
            state = action.tables;
            return state;
        case Types.DELETE_TABLE:
            console.log("deleteTable")
            console.log(state)
            index = state.feastTables.findIndex((table) => table.id === action.id[0]);
            state.feastTables.splice(index, 1);
            return state;
        case Types.ADD_TABLE:
            console.log("addTable")
            state = action.table;
            return state;
        case Types.UPDATE_TABLE:
            console.log("updateTable")
            state = action.table;
            return state;
        default:
            console.log("defaultTable ??")
            return state;
    }
};

export default tables;