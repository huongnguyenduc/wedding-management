import  {INSERT, DELETE, UPDATE, INIT, ERROR} from '../actions/actions'

const InitState={
    Status:{
        severity:'',
        message:''
    },
    Services: []
  }

const ServiceReducer = (state = InitState, action) => {
    switch(action.type) {
        case INIT:{
            return {Status:action.status, Services:action.payload}
        }
        case INSERT:
        {
           return {Status:action.status  ,Services:[...state.Services,action.payload]}
        }
        case DELETE:
        {
            return {Status:action.status, Services: state.Services.filter((item)=>{return item.id!==action.payload.id})};
        }
        case UPDATE:
        {
            let term = state.Services.filter((item)=>{return item.id!==action.payload.id});
            return {Status:action.status, Services:[...term,action.payload]} 
        }
        case ERROR:
        {
            return {...state,Status:action.status}
        }
        default:
            return state;
    }
}

export default ServiceReducer;