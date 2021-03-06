import {
  Backdrop,
  Container,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import React, { useEffect } from "react";
import useStyles from "./Styles";
import ShiftTable from "./shift/shiftTable";
import PolicyTable from "./policy/policyTable";
import { useDispatch, useSelector } from "react-redux";
import { GetPolicy, GetShift } from "./connect";
import { Alert } from "@material-ui/lab";
import { actCloseError } from "./actions/actions";
import { getCookie } from "../../action/Login";

function Policy() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.PolicyReducer);
  const Pending = StoreData.Pending;
  const Status = StoreData.Status;

  function CloseAlert() {
    dispatch(actCloseError());
  }

  useEffect(() => {
    dispatch(GetPolicy());
    dispatch(GetShift());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const privileges = JSON.parse(getCookie("privileges"));

  const canShowShift = (permission) => permission.authority === "READ_SHIFT";
  return (
    <Container maxWidth="lg" className={classes.PolicyContainer}>
      <PolicyTable />
      {privileges.some(canShowShift) ? <ShiftTable /> : <></>}
      <Backdrop
        open={Pending}
        className={classes.backdrop}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={Status.open}
        autoHideDuration={3000}
        onClose={CloseAlert}
        className={classes.Snackbar}
      >
        <Alert severity={Status.severity} onClose={CloseAlert}>
          {Status.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Policy;
