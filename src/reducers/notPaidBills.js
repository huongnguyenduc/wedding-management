import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (notPaidBills, id) => {
    var result = -1;
    notPaidBills.forEach((notPaidBill, index) => {
        if (notPaidBill.id === id) {
            result = index;
        }
    });
    return result;
}

const notPaidBills = (state = initialState, action) => {
    var index = -1;
    var { id, notPaidBill } = action;
    switch (action.type) {
        case Types.FETCH_NOTPAIDBILLS:
            console.log("fetchnotPaidBill")
            state = action.notPaidBills;
            return [...state];
        case Types.DELETE_NOTPAIDBILL:
            console.log("deletenotPaidBill")
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_NOTPAIDBILL:
            console.log("addnotPaidBill")
            state.push(action.notPaidBill);
            return [...state];
        case Types.UPDATE_NOTPAIDBILL:
            console.log("updatenotPaidBill")
            index = findIndex(state, notPaidBill.id);
            state[index] = notPaidBill;
            return [...state];
        default: 
            return [...state];
    }
};

export default notPaidBills;