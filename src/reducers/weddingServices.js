import * as Types from '../constants/ActionTypes';
var initialState = [];
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const weddingServices = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_WEDDINGSERVICES:
            console.log("fetchweddingServices")
            console.log(action.weddingServices)
            state = action.weddingServices;
            return state;
        case Types.DELETE_WEDDINGSERVICE:
            console.log("deleteweddingService")
            index = state.services.findIndex( (service) => service.service.id === action.serviceId);
            state.services.splice(index, 1);
            return state;
        case Types.ADD_WEDDINGSERVICE:
            console.log("addweddingService")
            if (isEmpty(state)) {
                let {feast, service, count, note, totalPrice} = action.weddingService;
                state = {
                    feast: feast,
                    services: [{service, count, note, totalPrice}]
                };
            } else {
                index = state.services.findIndex( (service) => service.service.id === action.weddingService.id.serviceId);
                if (index === -1) {
                    let {service, count, note, totalPrice} = action.weddingService;
                    state.services.push({service, count, note, totalPrice});
                    return state;
                } else {
                    let {service, count, note, totalPrice} = action.weddingService;
                    state.services[index] = {service, count, note, totalPrice};
                }
            }
            return state;
        case Types.UPDATE_WEDDINGSERVICE:
            console.log("updateweddingService")
            index = state.services.findIndex( (service) => service.service.id === action.weddingService.id.serviceId);
            let {service, count, note, totalPrice} = action.weddingService;
            if (index !== -1 ) state.services[index] = {service, count, note, totalPrice};
            return state;
        default: 
            return state;
    }
};

export default weddingServices;