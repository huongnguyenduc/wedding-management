const selectedRowFoodReducer = (state = [], action) => {
    switch(action.type) {
        case 'CLICK_ROW_FOOD':
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default selectedRowFoodReducer;