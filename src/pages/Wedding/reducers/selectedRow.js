

const selectedRowReducer = (state = [], action) => {
    switch(action.type) {
        case 'CLICK_ROW':
            return action.payload;
        default:
            return state;
    }
}

export default selectedRowReducer;