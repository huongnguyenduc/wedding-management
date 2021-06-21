import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actFetchWeddingsRequest = () => {
    return dispatch => {
        return callApi('feast', 'GET', null).then(function (res) {
            if (res) {
                dispatch(actFetchWeddings(res.data));
            }
            else {
                dispatch(actFetchWeddings([]));
            }
        });
    };
}

export const actFetchWeddings = (weddings) => {
    return {
        type : Types.FETCH_WEDDINGS,
        weddings
    }
}

export const actDeleteWeddingRequest = (id, deleteWeddingSuccess, deleteWeddingFailure) => {
    return dispatch => {
        return callApi(`feast/${id}`, 'DELETE', null).then(res =>{
            if (res) {
                dispatch(actDeleteWedding(id));
                deleteWeddingSuccess();
            } else {
                deleteWeddingFailure();
            }
        })
    }
}

export const actDeleteWedding = (id) => {
    return {
        type : Types.DELETE_WEDDING,
        id
    }
}

export const actAddWeddingRequest = (wedding, addWeddingSuccess, addWeddingFailure) => {
    console.log('request')
    console.log(wedding)
    return dispatch => {
        return callApi('feast', 'POST', wedding).then(res => {
            if (res){
                dispatch(actAddWedding(res.data));
                addWeddingSuccess();
            } else {
                addWeddingFailure();
            }
        });
    }
}

export const actAddWedding = (wedding) => {
    return {
        type : Types.ADD_WEDDING,
        wedding
    }
}

export const actGetWeddingRequest = (id) => {
    return dispatch => {
        return callApi(`feast/${id}`, 'GET', null).then(res => {
            dispatch(actGetWedding(res.data));
        });
    }
}

export const actGetWedding = (wedding) => {
    return {
        type : Types.EDIT_WEDDING,
        wedding
    }
}

export const actUpdateWeddingRequest = (wedding, updateWeddingSuccess, updateWeddingFailure) => {
    return dispatch => {
        return callApi(`feast`, 'PUT', wedding).then(res => {
            if (res) {
                dispatch(actUpdateWedding(res.data));
                updateWeddingSuccess();
            } else {
                updateWeddingFailure();
            }
        });
    }
}

export const actUpdateWedding = (wedding) => {
    return {
        type : Types.UPDATE_WEDDING,
        wedding
    }
}
