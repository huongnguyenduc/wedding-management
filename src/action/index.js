import * as Types from "./../constants/ActionTypes";
import callApi from "./../utils/apiCaller";

export const actFetchWeddingsRequest = () => {
  return (dispatch) => {
    return callApi("feast", "GET", null).then(function (res) {
      if (res) {
        dispatch(actFetchWeddings(res.data));
      } else {
        dispatch(actFetchWeddings([]));
      }
    });
  };
};

export const actFetchWeddings = (weddings) => {
  return {
    type: Types.FETCH_WEDDINGS,
    weddings,
  };
};

export const actDeleteWeddingRequest = (
  id,
  deleteWeddingSuccess,
  deleteWeddingFailure
) => {
  return (dispatch) => {
    return callApi(`feast/${id}`, "DELETE", null).then((res) => {
      if (res) {
        dispatch(actDeleteWedding(id));
        deleteWeddingSuccess();
      } else {
        deleteWeddingFailure();
      }
    });
  };
};

export const actDeleteWedding = (id) => {
  return {
    type: Types.DELETE_WEDDING,
    id,
  };
};

export const actAddWeddingRequest = (
  wedding,
  addWeddingSuccess,
  addWeddingFailure,
  checkWeddingExist,
  checkWeddingFailure,
  resetForm,
  changeToNormalState
) => {
  console.log("request");
  console.log(wedding);
  return (dispatch) => {
    const { dateOfOrganization, idShift, lobbyId } = wedding;
    var data = { dateOfOrganization, idShift, lobbyId };
    callApi("feast/check-exist", "PUT", data).then((res) => {
      if (res) {
        if (res.data === true) {
          checkWeddingExist();
        } else {
          return callApi("feast", "POST", wedding).then((res) => {
            if (res) {
              dispatch(actAddWedding(res.data));
              resetForm();
              changeToNormalState();
              addWeddingSuccess();
            } else {
              addWeddingFailure();
            }
          });
        }
      } else {
        checkWeddingFailure();
      }
    });
  };
};

export const actAddWedding = (wedding) => {
  return {
    type: Types.ADD_WEDDING,
    wedding,
  };
};

export const actGetWeddingRequest = (id) => {
  return (dispatch) => {
    return callApi(`feast/${id}`, "GET", null).then((res) => {
      dispatch(actGetWedding(res.data));
    });
  };
};

export const actGetWedding = (wedding) => {
  return {
    type: Types.EDIT_WEDDING,
    wedding,
  };
};

export const actUpdateWeddingRequest = (
  wedding,
  updateWeddingSuccess,
  updateWeddingFailure,
  checkWeddingExist,
  checkWeddingFailure,
  resetForm,
  changeToNormalState,
  oldDateUpdate,
  oldShift,
  oldLobby
) => {
  return (dispatch) => {
    const { dateOfOrganization, idShift, lobbyId } = wedding;
    var data = { dateOfOrganization, idShift, lobbyId };
    if (
      oldDateUpdate === dateOfOrganization &&
      idShift === oldShift &&
      lobbyId === oldLobby
    ) {
      return callApi(`feast`, "PUT", wedding).then((res) => {
        if (res) {
          dispatch(actUpdateWedding(res.data));
          resetForm();
          changeToNormalState();
          updateWeddingSuccess();
        } else {
          console.log(wedding);
          updateWeddingFailure();
          console.log("alo");
        }
      });
    } else
      callApi("feast/check-exist", "PUT", data).then((res) => {
        if (res) {
          if (res.data === true) {
            checkWeddingExist();
          } else {
            return callApi(`feast`, "PUT", wedding).then((res) => {
              if (res) {
                dispatch(actUpdateWedding(res.data));
                resetForm();
                changeToNormalState();
                updateWeddingSuccess();
              } else {
                updateWeddingFailure();
              }
            });
          }
        } else {
          checkWeddingFailure();
        }
      });
  };
};

export const actUpdateWeddingMiniRequest = (
  wedding,
  updateDepositSuccess,
  updateDepositFailure,
  resetForm
) => {
  return () => {
    return callApi(`feast`, "PUT", wedding).then((res) => {
      if (res) {
        resetForm();
        updateDepositSuccess();
      } else {
        updateDepositFailure();
      }
    });
  };
};

export const actUpdateWeddingRegimeRequest = (wedding) => {
  return () => {
    return callApi(`feast/regime`, "POST", wedding).then((res) => {
      if (res) {
        console.log("Them khuyen mai thanh cong");
      } else {
        console.log("Them khuyen mai that bai");
      }
    });
  };
};

export const actUpdateWedding = (wedding) => {
  return {
    type: Types.UPDATE_WEDDING,
    wedding,
  };
};
