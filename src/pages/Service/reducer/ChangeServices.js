import  {PENDING,DONE, INSERT, DELETE, UPDATE, INIT, ERROR, CLOSEERROR} from '../actions/actions'

const InitState={
    Status:{
        open:false,
        severity:'',
        message:''
    },
    Pending:false,
    Services: []
  }

const ServiceReducer = (state = InitState, action) => {
    switch(action.type) {
        case PENDING:{
            return {...state,Pending:true}
        }
        case DONE:{
            return {...state,Pending:false}
        }
        case INIT:{
            return {...state,Pending:action.Pending,Services:action.payload}
        }
        case INSERT:
        {
           return {...state,Pending:action.Pending,Status:action.status,Services:[...state.Services,action.payload]}
        }
        case DELETE:
        {
            return {...state,Pending:action.Pending,Status:action.status, Services: state.Services.filter((item)=>{return item.id!==action.payload.id})};
        }
        case UPDATE:
        {
            let term = state.Services.filter((item)=>{return item.id!==action.payload.id});
            return {...state,Pending:action.Pending,Status:action.status, Services:[...term,action.payload]} 
        }
        case ERROR:
        {
            return {...state,Pending:action.Pending,Status:action.status}
        }
        case CLOSEERROR:
        {
            return {...state,Status:{...state.Status,open:false}}
        }
        default:
            return state;
    }
}

export default ServiceReducer;