import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";

export const actFetchPromotionWeddingsRequest = (weddingId) => {
  return (dispatch) => {
    return callApi(`feast/${weddingId}/regime`, "GET", null).then(function (
      res
    ) {
      if (res) dispatch(actFetchPromotionWeddings(res.data));
      else dispatch(actFetchPromotionWeddings([]));
    });
  };
};

export const actFetchPromotionWeddings = (promotions) => {
  return {
    type: Types.FETCH_PROMOTION_WEDDINGS,
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

export const actUpdatePromotionWeddingRequest = (promotion) => {
  return (dispatch) => {
    return callApi(`feast/regime`, "POST", promotion).then((res) => {
      if (res) {
        dispatch(actUpdatePromotionWedding(res.data));
      } else {
        console.log(res.data);
      }
    });
  };
};

export const actUpdatePromotionWedding = (promotion) => {
  return {
    type: Types.UPDATE_PROMOTION_WEDDING,
    promotion,
  };
};
