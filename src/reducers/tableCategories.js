import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (tables, id) => {
    var result = -1;
    tables.forEach((tableCategory, index) => {
        if (tableCategory.id === id) {
            result = index;
        }
    });
    return result;
}

const tableCategories = (state = initialState, action) => {
    var index = -1;
    var { id, tableCategory } = action;
    switch (action.type) {
        case Types.FETCH_TABLECATEGORIES:
            console.log("fetchTableCategory")
            state = action.tableCategories;
            return [...state];
        case Types.DELETE_TABLECATEGORY:
            console.log("deleteTableCategory")
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_TABLECATEGORY:
            console.log("addTableCategory")
            state.push(action.tableCategory);
            return [...state];
        case Types.UPDATE_TABLECATEGORY:
            console.log("updateTable")
            index = findIndex(state, tableCategory.id);
            state[index] = tableCategory;
            return [...state];
        default: return [...state];
    }
};

export default tableCategories;