const selectedRowReducer = (state = [], action) => {
  switch (action.type) {
    case "CLICK_ROW":
      console.log("aaaaaaaaaaaaaaa", action);
      return action.payload;
    default:
      return state;
  }
};

export default selectedRowReducer;
