import { CLOSEERROR, DONE, ERROR, INITALL, PENDING } from '../../Lobby/actions/actions'
import  { DELETESHIFT, INITFINE, INITSHIFT, INSERTSHIFT, UPDATEFINE, UPDATESHIFT } from '../actions/actions'

const InitState={
    Status:{
        open:false,
        severity:'',
        message:''
    },
    Pending:true,
    Shift: [],
    Fine:[]
  }

const ShiftReducer = (state = InitState, action) => {
    switch(action.type) {
        case PENDING:{
            return {...state,Pending:true}
        }
        case DONE:{
            return {...state,Pending:action.pending}
        }
        case INITSHIFT:{
            return {...state,Pending:action.pending, Status:action.status, Shift:action.payload}
        }
        case INSERTSHIFT:
        {
           return {...state,Pending:action.pending, Status:action.status  ,Shift:[...state.Shift,action.payload]}
        }
        case DELETESHIFT:
        {
            return {...state,Pending:action.pending, Status:action.status, Shift: state.Shift.filter((item)=>{return item.id!==action.payload.id})};
        }
        case UPDATESHIFT:
        {
            let term = state.Shift.filter((item)=>{return item.id!==action.payload.id});
            return {...state,Pending:action.pending, Status:action.status, Shift:[...term,action.payload]} 
        }
        case INITFINE:{
            return {...state,Pending:action.pending, Status:action.status, Fine:action.payload}
        }
        case UPDATEFINE:
        {
            return {...state,Pending:action.pending, Status:action.status, Fine:action.payload} 
        }
        case ERROR:
        {
            return {...state,Pending:action.pending, Status:action.status}
        }
        case CLOSEERROR:
        {
            return {...state,Status:{...state.Status,open:false}}
        }
        case INITALL:{
            return {...state,Status:action.status, Shift:action.Shift, Fine:action.Fine}
        }
        default:
            return state;
    }
}

export default ShiftReducer;