import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";

export const actFetchPromotionsRequest = () => {
  return (dispatch) => {
    return callApi("regime", "GET", null).then(function (res) {
      if (res) dispatch(actFetchPromotions(res.data));
      else dispatch(actFetchPromotions([]));
    });
  };
};

export const actFetchPromotions = (promotions) => {
  return {
    type: Types.FETCH_PROMOTIONS,
    promotions,
  };
};

export const actDeletePromotionRequest = (id, deleteSuccess, deleteFailure) => {
  return (dispatch) => {
    return callApi(`regime/${id}`, "DELETE", null).then((res) => {
      if (res) {
        dispatch(actDeletePromotion(id));
        deleteSuccess();
      } else {
        deleteFailure();
      }
    });
  };
};

export const actDeletePromotion = (id) => {
  return {
    type: Types.DELETE_PROMOTION,
    id,
  };
};

export const actAddPromotionRequest = (promotion) => {
  return (dispatch) => {
    return callApi("regime", "POST", promotion).then((res) => {
      if (res) dispatch(actAddPromotion(res.data));
    });
  };
};

export const actAddPromotion = (promotion) => {
  return {
    type: Types.ADD_PROMOTION,
    promotion,
  };
};

// export const actGetFoodRequest = (id) => {
//   return (dispatch) => {
//     return callApi(`food/${id}`, "GET", null).then((res) => {
//       dispatch(actGetFood(res.data));
//     });
//   };
// };

// export const actGetFood = (food) => {
//   return {
//     type: Types.EDIT_FOOD,
//     food,
//   };
// };

export const actUpdatePromotionRequest = (
  promotion,
  updateSuccess,
  updateFailure
) => {
  return (dispatch) => {
    return callApi(`regime`, "POST", promotion).then((res) => {
      if (res) {
        dispatch(actUpdatePromotion(res.data));
        updateSuccess();
      } else {
        updateFailure();
      }
    });
  };
};

export const actUpdatePromotion = (promotion) => {
  return {
    type: Types.UPDATE_PROMOTION,
    promotion,
  };
};
