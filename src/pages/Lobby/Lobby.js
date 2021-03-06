import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CategoryTable from "./LobbyCategory/CategoryTable";
import LobbyPage from "./LobbyPage/LobbyPage";
import { useDispatch, useSelector } from "react-redux";
import { GetLobby, GetLobbyCategory } from "../Lobby/Connect";
import useStyles from "./Style";
import { Alert } from "@material-ui/lab";
import { actCloseError } from "./actions/actions";
import { getCookie } from "../../action/Login";

function Lobby() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.changeLobbyData);
  const Pending = StoreData.Pending;
  const Status = StoreData.Status;
  const [page, setPage] = useState("lobby");

  const scrollHandler = (event) => {
    var header = document.querySelector(".ServiceHeader");
    if (header != null)
      header.classList.toggle(classes.HeaderScroll, window.scrollY > 80);
  };

  useEffect(() => {
    dispatch(GetLobbyCategory());
    dispatch(GetLobby());
    window.addEventListener("scroll", scrollHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function CloseAlert() {
    dispatch(actCloseError());
  }
  const privileges = JSON.parse(getCookie("privileges"));

  const canShowLobbyCategory = (permission) =>
    permission.authority === "READ_LOBBYCATEGORY";
  return (
    <div className={classes.MainPage}>
      <LobbyPage style={{ display: page === "lobby" ? "" : "" }} />
      <CategoryTable
        open={page === "lobbyCategory"}
        style={{ display: page === "lobbyCategory" ? "" : "none" }}
        onClose={() => {
          setPage("lobby");
        }}
      />

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
      <div className={classes.SwitchButton}>
        <div
          name="lobby"
          className={`${classes.button}  ${
            page === "lobby" ? classes.actButton : ""
          }`}
          onClick={() => {
            setPage("lobby");
          }}
        >
          S???NH
        </div>
        {privileges.some(canShowLobbyCategory) ? (
          <div
            name="lobbyCategory"
            className={`${classes.button} ${
              page === "lobbyCategory" ? classes.actButton : ""
            }`}
            onClick={() => {
              setPage("lobbyCategory");
            }}
          >
            LO???I S???NH
          </div>
        ) : (
          <></>
        )}
      </div>

      <Backdrop
        open={Pending}
        className={classes.backdrop}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Lobby;
