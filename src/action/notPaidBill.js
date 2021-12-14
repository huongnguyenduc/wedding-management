import * as Types from "./../constants/ActionTypes";
import callApi from "./../utils/apiCaller";

export const actFetchNotPaidBillsRequest = () => {
  return (dispatch) => {
    return callApi("bill/status/0", "GET", null).then(function (res) {
      if (res) {
        dispatch(actFetchNotPaidBills(res.data));
      } else {
        dispatch(actFetchNotPaidBills([]));
      }
    });
  };
};

export const actFetchNotPaidBills = (notPaidBills) => {
  return {
    type: Types.FETCH_NOTPAIDBILLS,
    notPaidBills,
  };
};

export const actDeleteNotPaidBillRequest = (id) => {
  return (dispatch) => {
    return callApi(`feast/${id}`, "DELETE", null).then((res) => {
      dispatch(actDeleteNotPaidBill(id));
    });
  };
};

export const actDeleteNotPaidBill = (id) => {
  return {
    type: Types.DELETE_NOTPAIDBILL,
    id,
  };
};

export const actAddNotPaidBillRequest = (notPaidBill) => {
  console.log("request");
  console.log(notPaidBill);
  return (dispatch) => {
    return callApi("feast", "POST", notPaidBill).then((res) => {
      if (res) dispatch(actAddNotPaidBill(res.data));
    });
  };
};

export const actAddNotPaidBill = (notPaidBill) => {
  return {
    type: Types.ADD_NOTPAIDBILL,
    notPaidBill,
  };
};

export const actGetNotPaidBillRequest = (id) => {
  return (dispatch) => {
    return callApi(`bill/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetNotPaidBill(res.data));
      } else {
      }
    });
  };
};

export const actGetNotPaidBill = (notPaidBill) => {
  return {
    type: Types.EDIT_NOTPAIDBILL,
    notPaidBill,
  };
};

export const actUpdateNotPaidBillRequest = (
  id,
  savedBillSuccess,
  savedBillFailure
) => {
  return (dispatch) => {
    return callApi(`bill/${id}`, "PUT", null).then((res) => {
      if (res) {
        dispatch(actUpdateNotPaidBill(res.data));
        dispatch(actGetNotPaidBillRequest(id));
        // console.log("aaaaaaaaaaaaa", res.data);
        savedBillSuccess();
      } else {
        savedBillFailure();
      }
    });
  };
};

export const actUpdateNotPaidBill = (notPaidBill) => {
  return {
    type: Types.UPDATE_NOTPAIDBILL,
    notPaidBill,
  };
};
