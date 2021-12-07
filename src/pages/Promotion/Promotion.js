import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../../components/MuiTheme";
import Account from "./Account";
import { connect } from "react-redux";
import { actFetchPromotionsRequest } from "../../action/promotion";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "100px",
  },
  indicator: {
    backgroundColor: "#FC5404",
    height: "5px",
    borderRadius: 10,
  },
}));

function Access(props) {
  const classes = useStyles();
  useEffect(() => {
    props.getPromotions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Account promotions={props.promotions} />
      </div>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    promotions: state.promotions,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getPromotions: () => {
      dispatch(actFetchPromotionsRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Access);
