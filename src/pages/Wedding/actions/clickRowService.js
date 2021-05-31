const clickRowService = (row) => {
    return {
        type: 'CLICK_ROW_SERVICE',
        payload: row
    }; 
}
export default clickRowService;