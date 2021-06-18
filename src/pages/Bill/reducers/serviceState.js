export const NORMAL = 0;
export const EDIT_SERVICE = 1;
export const EDIT_ORDER_SERVICE = 2;

const serviceStateReducer = (state = {state: NORMAL, canEdit: false}, action) => {
    switch(action.type) {
        case 'NORMAL_SERVICE_STATE':
            return {state: NORMAL, canEdit: false};
        case 'EDIT_SERVICE':
            return {state: EDIT_SERVICE, canEdit: true};
        case 'EDIT_ORDER_SERVICE':
            return {state: EDIT_ORDER_SERVICE, canEdit: true};
        default:
            return state;
    }
}

export default serviceStateReducer;