

const addToCartReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD':
        {
          if(state.filter(item=>{return item.id === action.payload.id}).length>0)
            return state
          let term = state.slice();
          term.push(action.payload) 
          return term;
        }
        default:
            return state;
    }
}

export default addToCartReducer;