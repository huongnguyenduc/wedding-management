const getDataTable = (data) => {
    return {
        type: 'GET_DATA',
        payload: data
    }; 
}

export default getDataTable;