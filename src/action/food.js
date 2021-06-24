import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchFoodsRequest = () => {
    return dispatch => {
        return callApi('food', 'GET', null).then(function (res) {
            if (res)
                dispatch(actFetchFoods(res.data));
            else
                dispatch(actFetchFoods([]));
        });
    };
}

export const actFetchFoods = (foods) => {
    return {
        type : Types.FETCH_FOODS,
        foods
    }
}

export const actDeleteFoodRequest = (id) => {
    return dispatch => {
        return callApi(`food/${id}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteFood(id));
        })
    }
}

export const actDeleteFood = (id) => {
    return {
        type : Types.DELETE_FOOD,
        id
    }
}

export const actAddFoodRequest = (food) => {
    console.log('request')
    console.log(food)
    return dispatch => {
        return callApi('food', 'POST', food).then(res => {
            if (res)
                dispatch(actAddFood(res.data));
        });
    }
}

export const actAddFood = (food) => {
    return {
        type : Types.ADD_FOOD,
        food
    }
}

export const actGetFoodRequest = (id) => {
    return dispatch => {
        return callApi(`food/${id}`, 'GET', null).then(res => {
            dispatch(actGetFood(res.data));
        });
    }
}

export const actGetFood = (food) => {
    return {
        type : Types.EDIT_FOOD,
        food
    }
}

export const actUpdateFoodRequest = (food) => {
    return dispatch => {
        return callApi(`food/${food.id}`, 'PUT', food).then(res => {
            dispatch(actUpdateFood(res.data));
        });
    }
}

export const actUpdateFood = (food) => {
    return {
        type : Types.UPDATE_FOOD,
        food
    }
}
