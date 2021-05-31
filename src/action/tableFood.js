import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchTableFoodsRequest = (feastTableId) => {
    return dispatch => {
        return callApi(`feast-table/${feastTableId}/food`, 'GET', null).then(function (res) {
            if (res)
                dispatch(actFetchTableFoods(res.data));
            else
                dispatch(actFetchTableFoods([]));
        });
    };
}

export const actFetchTableFoods = (tableFoods) => {
    return {
        type : Types.FETCH_TABLEFOODS,
        tableFoods
    }
}
// export const actGetTableRequest = (id) => {
//     return dispatch => {
//         return callApi(`table/${id}`, 'GET', null).then(res => {
//             dispatch(actGetTable(res.data));
//         });
//     }
// }

// export const actGetTable = (table) => {
//     return {
//         type : Types.EDIT_TABLE,
//         table
//     }
// }

export const actUpdateTableFoodRequest = (tableFood) => {
    return dispatch => {
        return callApi(`feast-table/food`, 'PUT', tableFood).then(res => {
            dispatch(actUpdateTableFood(res.data));
        });
    }
}

export const actUpdateTableFood = (tableFood) => {
    return {
        type : Types.UPDATE_TABLEFOOD,
        tableFood
    }
}


export const actDeleteTableFoodRequest = (feastTableId, foodId) => {
    return dispatch => {
        return callApi(`feast-table/${feastTableId}/food/${foodId}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteTableFood(foodId));
        })
    }
}

export const actDeleteTableFood = (foodId) => {
    return {
        type : Types.DELETE_TABLEFOOD,
        foodId
    }
}

export const actAddTableFoodRequest = (tableFood) => {
    console.log('request')
    console.log(tableFood)
    return dispatch => {
        return callApi('feast-table/food', 'POST', tableFood).then(res => {
            if (res)
                dispatch(actAddTableFood(res.data));
        });
    }
}

export const actAddTableFood = (tableFood) => {
    return {
        type : Types.ADD_TABLEFOOD,
        tableFood
    }
}