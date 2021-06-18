import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (services, id) => {
    var result = -1;
    services.forEach((service, index) => {
        if (service.id === id) {
            result = index;
        }
    });
    return result;
}

const services = (state = initialState, action) => {
    var index = -1;
    var { id, service } = action;
    switch (action.type) {
        case Types.FETCH_SERVICES:
            console.log("fetchservices")
            state = action.services;
            return state;
        case Types.DELETE_SERVICE:
            console.log("deleteservice")
            index = findIndex(state, id);
            state.splice(index, 1);
            return state;
        case Types.ADD_SERVICE:
            console.log("addservice")
            state.push(action.service);
            return state;
        case Types.UPDATE_SERVICE:
            console.log("updateservice")
            index = findIndex(state, service.id);
            state[index] = service;
            return state;
        default: return state;
    }
};

export default services;