import * as Types from '../constants/ActionTypes';
var initialState = [];
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const weddingServices = (state = initialState, action) => {
    var index = -1;
    var { weddingService } = action;
    switch (action.type) {
        case Types.FETCH_WEDDINGSERVICES:
            console.log("fetchweddingServices")
            console.log(action.weddingServices)
            state = action.weddingServices;
            return {...state};
        case Types.DELETE_WEDDINGSERVICE:
            console.log("deleteweddingService")
            if ('services' in state)
                {index = state.services.findIndex( (service) => service.id === action.serviceId);
                state.services.splice(index, 1);}
            else {
                index = state.findIndex( (service) => service.id === action.serviceId);
                state.splice(index, 1);
            }
            return {...state};
        case Types.ADD_WEDDINGSERVICE:
            console.log("addweddingService")
            console.log(action.weddingService)
            if ('services' in state)
                state.services.push(action.weddingService);
            else {
                console.log(state)
                if (isEmpty(state)) state = [];
                state.push(action.weddingService);
            }
            return {...state};
        case Types.UPDATE_WEDDINGSERVICE:
            console.log("updateweddingService")
            if ('services' in state)
                {index = state.services.findIndex( (service) => service.service.id === action.weddingService.id.serviceId);
                state.services[index] = weddingService;
            }
            else {
                console.log(action.weddingService);
                index = state.findIndex( (service) => service.service.id === action.weddingService.id.serviceId);
                state[index] = weddingService;
            }
            console.log("updatedweddingService")
            return {...state};
        default: 
            return {...state};
    }
};

export default weddingServices;