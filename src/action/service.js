import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchServicesRequest = () => {
    return dispatch => {
        return callApi('service', 'GET', null).then(function (res) {
            if (res)
                dispatch(actFetchServices(res.data));
            else
                dispatch(actFetchServices([]));
        });
    };
}

export const actFetchServices = (services) => {
    return {
        type : Types.FETCH_SERVICES,
        services
    }
}

export const actDeleteServiceRequest = (id) => {
    return dispatch => {
        return callApi(`service/${id}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteService(id));
        })
    }
}

export const actDeleteService = (id) => {
    return {
        type : Types.DELETE_SERVICE,
        id
    }
}

export const actAddServiceRequest = (service) => {
    console.log('request')
    console.log(service)
    return dispatch => {
        return callApi('service', 'POST', service).then(res => {
            if (res)
                dispatch(actAddService(res.data));
        });
    }
}

export const actAddService = (service) => {
    return {
        type : Types.ADD_SERVICE,
        service
    }
}

export const actGetServiceRequest = (id) => {
    return dispatch => {
        return callApi(`service/${id}`, 'GET', null).then(res => {
            dispatch(actGetService(res.data));
        });
    }
}

export const actGetService = (service) => {
    return {
        type : Types.EDIT_SERVICE,
        service
    }
}

export const actUpdateServiceRequest = (service) => {
    return dispatch => {
        return callApi(`service/${service.id}`, 'PUT', service).then(res => {
            dispatch(actUpdateService(res.data));
        });
    }
}

export const actUpdateService = (food) => {
    return {
        type : Types.UPDATE_SERVICE,
        food
    }
}
