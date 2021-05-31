const selectedRowServiceReducer = (state = [], action) => {
    switch(action.type) {
        case 'CLICK_ROW_SERVICE':
            return action.payload;
        default:
            return state;
    }
}

export default selectedRowServiceReducer;