import * as Types from '../constants/ActionTypes';
var initialState = [];
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const tableFoods = (state = initialState, action) => {
    var index = -1;
    var { tableFood } = action;
    switch (action.type) {
        case Types.FETCH_TABLEFOODS:
            console.log("fetchTableFoods")
            console.log(action.tableFoods)
            state = action.tableFoods;
            return {...state};
        case Types.DELETE_TABLEFOOD:
            console.log("deleteTableFood")
            if ('foods' in state)
                {index = state.foods.findIndex( (food) => food.id === action.foodId);
                state.foods.splice(index, 1);}
            else {
                index = state.findIndex( (food) => food.id === action.foodId);
                state.splice(index, 1);
            }
            return {...state};
        case Types.ADD_TABLEFOOD:
            console.log("addTableFood")
            console.log(action.tableFood)
            if ('foods' in state)
                state.foods.push(action.tableFood);
            else {
                console.log(state)
                if (isEmpty(state)) state = [];
                state.push(action.tableFood);
            }
            return state;
        case Types.UPDATE_TABLEFOOD:
            console.log("updateTable")
            if ('foods' in state)
                {index = state.foods.findIndex( (food) => food.food.id === action.tableFood.id.foodId);
                state.foods[index] = tableFood;
            }
            else {
                console.log(action.tableFood);
                index = state.findIndex( (food) => food.food.id === action.tableFood.id.foodId);
                state[index] = tableFood;
            }
            console.log("updatedTable")
            return {...state};
        default: 
            return {...state};
    }
};

export default tableFoods;