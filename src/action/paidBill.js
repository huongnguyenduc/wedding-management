import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actFetchPaidBillsRequest = () => {
    return dispatch => {
        return callApi('bill/status/1', 'GET', null).then(function (res) {
            if (res) {
                dispatch(actFetchPaidBills(res.data));
            }
            else {
                dispatch(actFetchPaidBills([]));
            }
        });
    };
}

export const actFetchPaidBills = (paidBills) => {
    return {
        type : Types.FETCH_PAIDBILLS,
        paidBills
    }
}

export const actDeletePaidBillRequest = (id) => {
    return dispatch => {
        return callApi(`feast/${id}`, 'DELETE', null).then(res =>{
            dispatch(actDeletePaidBill(id));
        })
    }
}

export const actDeletePaidBill = (id) => {
    return {
        type : Types.DELETE_PAIDBILL,
        id
    }
}

export const actAddPaidBillRequest = (paidBill) => {
    console.log('request')
    console.log(paidBill)
    return dispatch => {
        return callApi('feast', 'POST', paidBill).then(res => {
            if (res)
                dispatch(actAddPaidBill(res.data));
        });
    }
}

export const actAddPaidBill = (paidBill) => {
    return {
        type : Types.ADD_PAIDBILL,
        paidBill
    }
}

export const actGetPaidBillRequest = (id) => {
    return dispatch => {
        return callApi(`bill/${id}`, 'GET', null).then(res => {
            dispatch(actGetPaidBill(res.data));
        });
    }
}

export const actGetPaidBill = (paidBill) => {
    return {
        type : Types.EDIT_PAIDBILL,
        paidBill
    }
}

export const actUpdatePaidBillRequest = (paidBill) => {
    return dispatch => {
        return callApi(`feast`, 'PUT', paidBill).then(res => {
            dispatch(actUpdatePaidBill(res.data));
        });
    }
}

export const actUpdatePaidBill = (paidBill) => {
    return {
        type : Types.UPDATE_PAIDBILL,
        paidBill
    }
}
