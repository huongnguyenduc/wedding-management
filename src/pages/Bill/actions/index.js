const clickRow = (row) => {
    return {
        type: 'CLICK_ROW',
        payload: row
    }; 
}
export default clickRow;