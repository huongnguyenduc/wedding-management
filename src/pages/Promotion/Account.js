import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiThemeProvider,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import theme from "../../components/MuiTheme";
import DepositSaleList from "./Components/DepositSale";
import DateSaleList from "./Components/DateSale";

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: "center",
    marginTop: "10px",
    display: "flex",
  },
  select: {
    justifyContent: "space-evenly",
    marginTop: "20px",
    display: "flex",
  },
  loading: {
    alignSelf: "center",
  },
  loadingPage: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
}));

function Account(props) {
  const classes = useStyles();
  const promotions = props.promotions;
  if (promotions) console.log("aaaaaaaaaaaaa", promotions);
  return (
    <>
      {props.promotions ? (
        <MuiThemeProvider theme={theme}>
          <div className={classes.title}>
            <Typography variant="h4">Quản Lý Khuyến Mãi</Typography>
          </div>
          <div className={classes.select}>
            <DepositSaleList rows={props.promotions} />
          </div>
          <div className={classes.select}>
            <DateSaleList rows={props.promotions} />
          </div>
        </MuiThemeProvider>
      ) : (
        <div className={classes.loadingPage}>
          <CircularProgress className={classes.loading} />
        </div>
      )}
    </>
  );
}

export default Account;
