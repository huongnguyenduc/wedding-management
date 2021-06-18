import * as Types from '../constants/ActionTypes';
var initialState = [];

var findIndex = (foods, id) => {
    var result = -1;
    foods.forEach((food, index) => {
        if (food.id === id) {
            result = index;
        }
    });
    return result;
}

const foods = (state = initialState, action) => {
    var index = -1;
    var { id, food } = action;
    switch (action.type) {
        case Types.FETCH_FOODS:
            console.log("fetchFoods")
            state = action.foods;
            return [...state];
        case Types.DELETE_FOOD:
            console.log("deleteFood")
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_FOOD:
            console.log("addFood")
            state.push(action.food);
            return [...state];
        case Types.UPDATE_FOOD:
            console.log("updateFood")
            index = findIndex(state, food.id);
            state[index] = food;
            return [...state];
        default: return [...state];
    }
};

export default foods;