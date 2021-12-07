import * as Types from "../constants/ActionTypes";
var initialState = [];

// var findIndex = (promotions, id) => {
//   var result = -1;
//   promotions.forEach((promotion, index) => {
//     if (promotion.id === id) {
//       result = index;
//     }
//   });
//   return result;
// };

const promotionWeddings = (state = initialState, action) => {
  // var index = -1;
  // var { id, promotion } = action;
  switch (action.type) {
    case Types.FETCH_PROMOTION_WEDDINGS:
      state = action.promotions;
      return [...state];
    // case Types.DELETE_PROMOTION:
    //   index = findIndex(state, id);
    //   state.splice(index, 1);
    //   return [...state];
    // case Types.ADD_PROMOTION:
    //   state.push(promotion);
    //   return [...state];
    // case Types.UPDATE_PROMOTION:
    //   index = findIndex(state, promotion.id);
    //   state[index] = promotion;
    //   return [...state];
    default:
      return [...state];
  }
};

export default promotionWeddings;
