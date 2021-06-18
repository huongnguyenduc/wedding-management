const clickRowTable = (row) => {
    return {
        type: 'CLICK_ROW_TABLE',
        payload: row
    }; 
}
export default clickRowTable;