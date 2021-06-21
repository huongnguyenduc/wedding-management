import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchTableCategoriesRequest = () => {
    return dispatch => {
        return callApi(`table-category`, 'GET', null).then(function (res) {
            dispatch(actFetchTableCategories(res.data));
        });
    };
}

export const actFetchTableCategories = (tableCategories) => {
    return {
        type : Types.FETCH_TABLECATEGORIES,
        tableCategories
    }
}
// export const actGetTableCategoryRequest = (id) => {
//     return dispatch => {
//         return callApi(`table-category/${id}`, 'GET', null).then(res => {
//             dispatch(actGetTableCategory(res.data));
//         });
//     }
// }

// export const actGetTableCategory = (tableCategory) => {
//     return {
//         type : Types.EDIT_TABLECATEGORY,
//         tableCategory
//     }
// }

export const actUpdateTableCategoryRequest = (tableCategory, updateTableCategorySuccess, updateTableCategoryFailure) => {
    return dispatch => {
        return callApi(`table-category`, 'PUT', tableCategory).then(res => {
            if (res) {
                dispatch(actUpdateTableCategory(res.data));
                updateTableCategorySuccess();
            } else {
                updateTableCategoryFailure();
            }
        });
    }
}

export const actUpdateTableCategory = (tableCategory) => {
    return {
        type : Types.UPDATE_TABLECATEGORY,
        tableCategory
    }
}


export const actDeleteTableCategoryRequest = (id, deleteTableCategorySuccess, deleteTableCategoryFailure) => {
    return dispatch => {
        return callApi(`table-category`, 'DELETE', [id]).then(res =>{
            if (res) {
                dispatch(actDeleteTableCategory(id));
                deleteTableCategorySuccess();
            } else {
                deleteTableCategoryFailure();
            }
        })
    }
}

export const actDeleteTableCategory = (id) => {
    return {
        type : Types.DELETE_TABLECATEGORY,
        id
    }
}

export const actAddTableCategoryRequest = (tableCategory, addTableCategorySuccess, addTableCategoryFailure) => {
    console.log('addTableCategory')
    console.log(tableCategory)
    return dispatch => {
        return callApi('table-category', 'POST', tableCategory).then(res => {
            if (res) {
                dispatch(actAddTableCategory(res.data));
                addTableCategorySuccess();
            } else {
                addTableCategoryFailure();
            }
        });
    }
}

export const actAddTableCategory = (tableCategory) => {
    return {
        type : Types.ADD_TABLECATEGORY,
        tableCategory
    }
}