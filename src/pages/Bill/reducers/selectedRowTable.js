const selectedRowTableReducer = (state = [], action) => {
    switch(action.type) {
        case 'CLICK_ROW_TABLE':
            console.log("clickSelectTable ??")
            console.log(action.payload)
            console.log(state)
            return action.payload;
        default:
            console.log(action.payload)
            console.log("defaultSelectTable ??")
            console.log(state)
            return {...state};
    }
}

export default selectedRowTableReducer;