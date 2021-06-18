const clickRowFood = (row) => {
    return {
        type: 'CLICK_ROW_FOOD',
        payload: row
    }; 
}
export default clickRowFood;