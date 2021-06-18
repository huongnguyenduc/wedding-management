import  {PENDING,DONE, INSERTFOOD, INSERTFOODCATEGORY, DELETEFOOD, DELETEFOODCATEGORY, UPDATEFOOD,UPDATEFOODCATEGORY, INITFOOD,INITFOODCATEGORY, ERROR,CLOSEERROR, INITALL, SELECT, CLOSE} from '../actions/actions'

const InitState={
    Status:{
        open:false,
        severity:'',
        message:''
    },
    Pending:true,
    Food: [],
    FoodCategory:[],
    SelectedFood:null
  }

const FoodReducer = (state = InitState, action) => {
    switch(action.type) {
        case SELECT:{
            return {...state,SelectedFood:action.payload}
        }
        case CLOSE:{
            return {...state,SelectedFood:null}
        }
        case PENDING:{
            return {...state,Pending:action.pending}
        }
        case DONE:{
            return {...state,Pending:action.pending}
        }
        case INITFOOD:{
            return {...state,Pending:action.pending, Status:action.status, Food:action.payload}
        }
        case INSERTFOOD:
        {
           return {...state,Pending:action.pending, Status:action.status  ,Food:[...state.Food,action.payload]}
        }
        case DELETEFOOD:
        {
            return {...state,Pending:action.pending, Status:action.status, Food: state.Food.filter((item)=>{return item.id!==action.payload.id})};
        }
        case UPDATEFOOD:
        {
            let term = state.Food.filter((item)=>{return item.id!==action.payload.id});
            return {...state,Pending:action.pending, Status:action.status, Food:[...term,action.payload]} 
        }
        case INITFOODCATEGORY:{
            return {...state,Pending:action.pending, Status:action.status, FoodCategory:action.payload}
        }
        case INSERTFOODCATEGORY:
        {
           return {...state,Pending:action.pending, Status:action.status  ,FoodCategory:[...state.FoodCategory,action.payload]}
        }
        case DELETEFOODCATEGORY:
        {
            return {...state,Pending:action.pending, Status:action.status, FoodCategory: state.FoodCategory.filter((item)=>{return item.id!==action.payload.id})};
        }
        case UPDATEFOODCATEGORY:
        {
            let term = state.FoodCategory.filter((item)=>{return item.id!==action.payload.id});
            return {...state,Pending:action.pending, Status:action.status, FoodCategory:[...term,action.payload]} 
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
            return {...state,Status:action.status, Food:action.Food, FoodCategory:action.FoodCategory}
        }
        default:
            return state;
    }
}

export default FoodReducer;