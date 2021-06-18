import * as Types from '../constants/ActionTypes';
var initialState = [];
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const tableFoods = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_TABLEFOODS:
            console.log("fetchTableFoods")
            console.log(action.tableFoods)
            state = action.tableFoods;
            return state;
        case Types.DELETE_TABLEFOOD:
            console.log("deleteTableFood")
            index = state.foods.findIndex( (food) => food.food.id === action.foodId);
            state.foods.splice(index, 1);
            return state;
        case Types.ADD_TABLEFOOD:
            console.log("addTableFood")
            if (isEmpty(state)) {
                let {feastTable, food, count, note, totalPrice} = action.tableFood;
                state = {
                    feastTable: feastTable,
                    foods: [{food, count, note, totalPrice}]
                };
            } else {
                index = state.foods.findIndex( (food) => food.food.id === action.tableFood.id.foodId);
                let {food, count, note, totalPrice} = action.tableFood;
                if (index === -1) {
                    state.foods.push({food, count, note, totalPrice});
                    return state;
                } else { 
                    state.foods[index] = {food, count, note, totalPrice};
                }
            }
            return state;
        case Types.UPDATE_TABLEFOOD:
            console.log("updateTableFood")
            index = state.foods.findIndex( (food) => food.food.id === action.tableFood.id.foodId);
            let {food, count, note, totalPrice} = action.tableFood;
            if (index !== -1 ) state.foods[index] = {food, count, note, totalPrice};
            return state;
        default: 
            return state;
    }
};

export default tableFoods;