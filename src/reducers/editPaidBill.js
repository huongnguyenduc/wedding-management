import * as Types from './../constants/ActionTypes';

var initialState = {};

const paidBillItem = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_PAIDBILL:
            state = action.paidBill;
            return state;
        default:
            return state;
    }
}

export default paidBillItem;
