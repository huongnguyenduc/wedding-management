import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchTablesRequest = (idWedding) => {
    return dispatch => {
        return callApi(`feast/${idWedding}/table`, 'GET', null).then(function (res) {
            if (res)
                dispatch(actFetchTables(res.data));
            else 
                dispatch(actFetchTables([]));
        });
    };
}

export const actFetchTables = (tables) => {
    return {
        type : Types.FETCH_TABLES,
        tables
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

export const actUpdateTableRequest = (table) => {
    return dispatch => {
        return callApi(`feast-table`, 'PUT', table).then(res => {
            dispatch(actUpdateTable(res.data));
        });
    }
}

export const actUpdateTable = (table) => {
    return {
        type : Types.UPDATE_TABLE,
        table
    }
}


export const actDeleteTableRequest = (id) => {
    return dispatch => {
        return callApi(`feast-table`, 'DELETE', id).then(res =>{
            dispatch(actDeleteTable(id));
        })
    }
}

export const actDeleteTable = (id) => {
    return {
        type : Types.DELETE_TABLE,
        id
    }
}

export const actAddTableRequest = (table) => {
    console.log('request')
    console.log(table)
    return dispatch => {
        return callApi('feast-table', 'POST', table).then(res => {
            if (res)
                dispatch(actAddTable(res.data));
        });
    }
}

export const actAddTable = (table) => {
    return {
        type : Types.ADD_TABLE,
        table
    }
}