import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchWeddingServicesRequest = (feastId) => {
    return dispatch => {
        return callApi(`feast/${feastId}/service`, 'GET', null).then(function (res) {
            if (res)
                dispatch(actFetchWeddingServices(res.data));
            else
                dispatch(actFetchWeddingServices([]));
        });
    };
}

export const actFetchWeddingServices = (weddingServices) => {
    return {
        type : Types.FETCH_WEDDINGSERVICES,
        weddingServices
    }
}
// export const actGetTableRequest = (id) => {
//     return dispatch => {
//         return callApi(`table/${id}`, 'GET', null).then(res => {
//             dispatch(actGetTable(res.data));
//         });
//     }
// }

// export const actGetTable = (table) => {
//     return {
//         type : Types.EDIT_TABLE,
//         table
//     }
// }

export const actUpdateWeddingServiceRequest = (weddingService) => {
    return dispatch => {
        return callApi(`feast/service`, 'PUT', weddingService).then(res => {
            dispatch(actUpdateWeddingService(res.data));
        });
    }
}

export const actUpdateWeddingService = (weddingService) => {
    return {
        type : Types.UPDATE_WEDDINGSERVICE,
        weddingService
    }
}


export const actDeleteWeddingServiceRequest = (feastId, serviceId) => {
    return dispatch => {
        return callApi(`feast/${feastId}/service/${serviceId}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteWeddingService(serviceId));
        })
    }
}

export const actDeleteWeddingService= (serviceId) => {
    return {
        type : Types.DELETE_WEDDINGSERVICE,
        serviceId
    }
}

export const actAddWeddingServiceRequest = (weddingService) => {
    console.log('request')
    console.log(weddingService)
    return dispatch => {
        return callApi('feast/service', 'POST', weddingService).then(res => {
            if (res)
                dispatch(actAddWeddingService(res.data));
        });
    }
}

export const actAddWeddingService = (weddingService) => {
    return {
        type : Types.ADD_WEDDINGSERVICE,
        weddingService
    }
}