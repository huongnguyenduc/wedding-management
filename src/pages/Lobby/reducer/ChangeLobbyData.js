import  {PENDING,DONE, INSERTLOBBY, INSERTLOBBYCATEGORY, DELETELOBBY, DELETELOBBYCATEGORY, UPDATELOBBY,UPDATELOBBYCATEGORY, INITLOBBY,INITLOBBYCATEGORY, ERROR,CLOSEERROR, INITALL} from '../actions/actions'

const InitState={
    Status:{
        open:false,
        severity:'',
        message:''
    },
    Pending:true,
    Lobby: [],
    LobbyCategory:[]
  }

const LobbyReducer = (state = InitState, action) => {
    switch(action.type) {
        case PENDING:{
            return {...state,Pending:action.pending}
        }
        case DONE:{
            return {...state,Pending:action.pending}
        }
        case INITLOBBY:{
            return {...state,Pending:action.pending, Status:action.status, Lobby:action.payload}
        }
        case INSERTLOBBY:
        {
           return {...state,Pending:action.pending, Status:action.status  ,Lobby:[...state.Lobby,action.payload]}
        }
        case DELETELOBBY:
        {
            return {...state,Pending:action.pending, Status:action.status, Lobby: state.Lobby.filter((item)=>{return item.id!==action.payload.id})};
        }
        case UPDATELOBBY:
        {
            let term = state.Lobby.filter((item)=>{return item.id!==action.payload.id});
            return {...state,Pending:action.pending, Status:action.status, Lobby:[...term,action.payload]} 
        }
        case INITLOBBYCATEGORY:{
            return {...state,Pending:action.pending, Status:action.status, LobbyCategory:action.payload}
        }
        case INSERTLOBBYCATEGORY:
        {
           return {...state,Pending:action.pending, Status:action.status  ,LobbyCategory:[...state.LobbyCategory,action.payload]}
        }
        case DELETELOBBYCATEGORY:
        {
            return {...state,Pending:action.pending, Status:action.status, LobbyCategory: state.LobbyCategory.filter((item)=>{return item.id!==action.payload.id})};
        }
        case UPDATELOBBYCATEGORY:
        {
            let term = state.LobbyCategory.filter((item)=>{return item.id!==action.payload.id});
            return {...state,Pending:action.pending, Status:action.status, LobbyCategory:[...term,action.payload]} 
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
            return {...state,Status:action.status, Lobby:action.Lobby, LobbyCategory:action.LobbyCategory}
        }
        default:
            return state;
    }
}

export default LobbyReducer;