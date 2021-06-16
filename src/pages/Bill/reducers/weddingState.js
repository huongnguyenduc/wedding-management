export const NORMAL = 0;
export const ADD_WEDDING_STATE = 1;
export const EDIT_WEDDING_STATE = 2;

const weddingStateReducer = (state = {state: NORMAL, canEdit: false}, action) => {
    switch(action.type) {
        case 'NORMAL':
            return {state: NORMAL, canEdit: false};
        case 'ADD_WEDDING_STATE':
            return {state: ADD_WEDDING_STATE, canEdit: true};
        case 'EDIT_WEDDING_STATE':
            return {state: EDIT_WEDDING_STATE, canEdit: true};
        default:
            return state;
    }
}

export default weddingStateReducer;