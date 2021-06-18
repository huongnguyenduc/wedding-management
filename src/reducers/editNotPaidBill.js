import * as Types from './../constants/ActionTypes';

var initialState = {};

const notPaidBillItem = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_NOTPAIDBILL:
            state = action.notPaidBill;
            return state;
        default:
            return state;
    }
}

export default notPaidBillItem;
