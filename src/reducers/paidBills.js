import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (paidBills, id) => {
    var result = -1;
    paidBills.forEach((paidBill, index) => {
        if (paidBill.id === id) {
            result = index;
        }
    });
    return result;
}

const paidBills = (state = initialState, action) => {
    var index = -1;
    var { id, paidBill } = action;
    switch (action.type) {
        case Types.FETCH_PAIDBILLS:
            console.log("fetchPaidBill")
            state = action.paidBills;
            return [...state];
        case Types.DELETE_PAIDBILL:
            console.log("deletePaidBill")
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_PAIDBILL:
            console.log("addPaidBill")
            state.push(action.paidBill);
            return [...state];
        case Types.UPDATE_PAIDBILL:
            console.log("updatePaidBill")
            index = findIndex(state, paidBill.id);
            state[index] = paidBill;
            return [...state];
        default: 
            return [...state];
    }
};

export default paidBills;