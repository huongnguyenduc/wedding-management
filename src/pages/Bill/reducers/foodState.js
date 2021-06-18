export const NORMAL = 0;
export const ADD_FOOD = 1;
export const EDIT_FOOD = 2;
export const EDIT_ORDER_FOOD = 3;

const foodStateReducer = (state = {state: NORMAL, canEdit: false}, action) => {
    switch(action.type) {
        case 'NORMAL':
            return {state: NORMAL, canEdit: false};
        case 'EDIT_FOOD':
            return {state: EDIT_FOOD, canEdit: true};
        case 'EDIT_ORDER_FOOD':
            return {state: EDIT_ORDER_FOOD, canEdit: true};
        default:
            return state;
    }
}

export default foodStateReducer;