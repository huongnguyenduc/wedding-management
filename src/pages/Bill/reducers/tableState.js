export const NORMAL = 0;
export const ADD_TABLE = 1;
export const EDIT_TABLE = 2;

const tableStateReducer = (state = {state: NORMAL, canEdit: false}, action) => {
    switch(action.type) {
        case 'TABLE_NORMAL_STATE':
            return {state: NORMAL, canEdit: false};
        case 'ADD_TABLE_STATE':
            return {state: ADD_TABLE, canEdit: true};
        case 'EDIT_TABLE_STATE':
            return {state: EDIT_TABLE, canEdit: true};
        default:
            return state;
    }
}

export default tableStateReducer;