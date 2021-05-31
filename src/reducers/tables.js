import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (tables, id) => {
    var result = -1;
    tables.forEach((table, index) => {
        if (table.id === id) {
            result = index;
        }
    });
    return result;
}

const tables = (state = initialState, action) => {
    var index = -1;
    var { id, table } = action;
    switch (action.type) {
        case Types.FETCH_TABLES:
            console.log("fetchTables")
            console.log(action.tables)
            state = action.tables;
            return state;
        case Types.DELETE_TABLE:
            console.log("deleteTable")
            console.log(state)
            index = state.feastTables.findIndex((table) => table.id === action.id[0]);
            state.feastTables.splice(index, 1);
            if ('feastTables' in state) {
                index = state.feastTables.findIndex((table) => table.id === action.id[0]);
                state.feastTables.splice(index, 1);
            }
            else {
                index = state.findIndex( (table) => table.id === action.id[0]);
                state.splice(index, 1);
            }
            return state;
        case Types.ADD_TABLE:
            console.log("addTable")
            if ('feastTables' in state) {
                console.log(state)
                state = action.table;
            }
            else {
                state.push(action.table);
            }
            return state;
        case Types.UPDATE_TABLE:
            if ('feastTables' in state)
                {index = state.feastTables.findIndex( (table) => table.id === action.table.id);
                state.feastTables[index] = table;
            }
            else {
                index = findIndex(state, table.id);
                state[index] = table;
            }
            console.log("updateTable")
            return state;
        default:
             console.log("defaultTable ??")
            return state;
    }
};

export default tables;