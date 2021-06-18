import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchShiftsRequest = () => {
    return dispatch => {
        return callApi('shift', 'GET', null).then(function (res) {
            dispatch(actFetchShifts(res.data));
        });
    };
}

export const actFetchShifts = (shifts) => {
    return {
        type : Types.FETCH_SHIFTS,
        shifts
    }
}
export const actGetShiftRequest = (id) => {
    return dispatch => {
        return callApi(`shift/${id}`, 'GET', null).then(res => {
            dispatch(actGetShift(res.data));
        });
    }
}

export const actGetShift = (shift) => {
    return {
        type : Types.EDIT_SHIFT,
        shift
    }
}

export const actUpdateShiftRequest = (shift) => {
    return dispatch => {
        return callApi(`shift/${shift.id}`, 'PUT', shift).then(res => {
            dispatch(actUpdateShift(res.data));
        });
    }
}

export const actUpdateShift = (shift) => {
    return {
        type : Types.UPDATE_SHIFT,
        shift
    }
}


export const actDeleteShiftRequest = (id) => {
    return dispatch => {
        return callApi(`shift/${id}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteShift(id));
        })
    }
}

export const actDeleteShift = (id) => {
    return {
        type : Types.DELETE_SHIFT,
        id
    }
}

export const actAddShiftRequest = (shift) => {
    console.log('request')
    console.log(shift)
    return dispatch => {
        return callApi('shift', 'POST', shift).then(res => {
            if (res)
                dispatch(actAddShift(res.data));
        });
    }
}

export const actAddShift = (shift) => {
    return {
        type : Types.ADD_SHIFT,
        shift
    }
}