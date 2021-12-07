import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiThemeProvider,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
} from "@material-ui/core/";
import BillInfo from "./components/BillInfo";
import ServiceTable from "./components/ServiceTable";
import theme from "../../components/MuiTheme";
import TableList from "./components/TableList";
import Payment from "./components/Payment";
import Management from "./components/Management";
import { actGetNotPaidBillRequest } from "./../../action/notPaidBill";
import { actFetchWeddingServicesRequest } from "./../../action/weddingService";
import { actFetchTablesRequest } from "./../../action/table";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { lightBlue } from "@material-ui/core/colors";
import { ArrowBack } from "@material-ui/icons";
import { default as ErrorIcon } from "../../assets/svg/error.svg";
import { actFetchPromotionsRequest } from "../../action/promotion";
import { actFetchPromotionWeddingsRequest } from "../../action/promotionWedding";
import { actFetchDepositPolicyRequest } from "../../action/depositPolicy";

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: "center",
    margin: "20px 0px",
    display: "flex",
  },
  tables: {
    marginLeft: "-50px",
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
  backButton: {
    position: "absolute",
    top: "90px",
    left: "10px",
    display: "flex",
    flexDirection: "row",
  },
  arrow: {
    marginRight: "5px",
  },
  error: {
    display: "flex",
    justifyContent: "center",
    height: "90vh",
    alignItems: "center",
    flexDirection: "column",
  },
  page: {
    marginTop: "100px",
  },
}));
//props.notPaidBillItem.feast && props.weddingServices.services && props.tables.feastTables
function DetailBill(props) {
  const classes = useStyles();
  useEffect(() => {
    props.getNotPaidBill(props.match.params.weddingId);
    props.fetchWeddingServices(props.match.params.weddingId);
    props.fetchAllTable(props.match.params.weddingId);
    props.getPromotions();
    props.getPromotionWeddings(props.match.params.weddingId);
    props.getDepositPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!props.notPaidBillItem.feast ? (
        <div className={classes.loadingPage}>
          <CircularProgress className={classes.loading} />
        </div>
      ) : !props.notPaidBillItem.numberOfTables ||
        props.notPaidBillItem.feast.deposit <= 0 ? (
        <div className={classes.error}>
          <Link to="/bill">
            <IconButton edge="start" className={classes.backButton}>
              <ArrowBack
                style={{ color: lightBlue[900] }}
                className={classes.arrow}
              />
              <Typography variant="h5" style={{ color: lightBlue[900] }}>
                Quay lại
              </Typography>
            </IconButton>
          </Link>
          <img src={ErrorIcon} width="90px" alt="" />
          <Typography variant="h3">
            Chưa có thông tin đặt bàn / đặt cọc
          </Typography>
          <Typography variant="h5" style={{ marginTop: "10px" }}>
            <Link
              to={`/wedding/${props.match.params.weddingId}/${props.notPaidBillItem.feast.id_lobby.id}/order`}
              style={{ color: "blue" }}
            >
              Đặt bàn / Đặt cọc
            </Link>{" "}
            cho tiệc cưới này!
          </Typography>
        </div>
      ) : props.notPaidBillItem.numberOfTables <
        props.notPaidBillItem.feast.id_lobby.lobbyCategory.mintable ? (
        <div className={classes.error}>
          <Link to="/bill">
            <IconButton edge="start" className={classes.backButton}>
              <ArrowBack
                style={{ color: lightBlue[900] }}
                className={classes.arrow}
              />
              <Typography variant="h5" style={{ color: lightBlue[900] }}>
                Quay lại
              </Typography>
            </IconButton>
          </Link>
          <img src={ErrorIcon} width="90px" alt="" />
          <Typography variant="h3">
            Số lượng bàn ({props.notPaidBillItem.numberOfTables}) nhỏ hơn số
            lượng bàn tối thiểu của sảnh (
            {props.notPaidBillItem.feast.id_lobby.lobbyCategory.mintable})
          </Typography>
          <Typography variant="h5" style={{ marginTop: "10px" }}>
            <Link
              to={`/wedding/${props.match.params.weddingId}/${props.notPaidBillItem.feast.id_lobby.id}/order`}
              style={{ color: "blue" }}
            >
              Đặt thêm bàn
            </Link>{" "}
            cho tiệc cưới này!
          </Typography>
        </div>
      ) : (
        <MuiThemeProvider theme={theme}>
          <div className={classes.page}>
            <Link to="/bill">
              <IconButton edge="start" className={classes.backButton}>
                <ArrowBack
                  style={{ color: lightBlue[900] }}
                  className={classes.arrow}
                />
                <Typography variant="h6" style={{ color: lightBlue[900] }}>
                  Quay lại
                </Typography>
              </IconButton>
            </Link>
            <div className={classes.title}>
              <Typography variant="h4">HÓA ĐƠN THANH TOÁN</Typography>
            </div>
            <Grid container spacing={2} className={classes.tables}>
              <Grid item xs={12}>
                <BillInfo
                  feast={props.notPaidBillItem.feast}
                  totalTablePrice={props.notPaidBillItem.totalTablePrice}
                  numberOfTables={props.notPaidBillItem.numberOfTables}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ServiceTable
                  rows={
                    props.weddingServices.services
                      ? props.weddingServices.services
                      : []
                  }
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TableList
                  rows={
                    props.tables.feastTables ? props.tables.feastTables : []
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12} justifyContent="center">
                <Payment
                  bill={props.notPaidBillItem}
                  promotions={props.promotions}
                  oldPromotions={props.promotionWeddings}
                  isSaved={props.notPaidBillItem.status === 1}
                  minDepositPercent={props.depositPolicy}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                justifyContent="center"
                alignContent="center"
              >
                <Management />
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    notPaidBillItem: state.notPaidBillItem,
    weddingServices: state.weddingServices,
    tables: state.tables,
    promotions: state.promotions,
    promotionWeddings: state.promotionWeddings,
    depositPolicy: state.depositPolicy,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getNotPaidBill: (id) => {
      dispatch(actGetNotPaidBillRequest(id));
    },
    fetchWeddingServices: (id) => {
      dispatch(actFetchWeddingServicesRequest(id));
    },
    fetchAllTable: (idWedding) => {
      dispatch(actFetchTablesRequest(idWedding));
    },
    getPromotions: () => {
      dispatch(actFetchPromotionsRequest());
    },
    getPromotionWeddings: (id) => {
      dispatch(actFetchPromotionWeddingsRequest(id));
    },
    getDepositPolicy: () => {
      dispatch(actFetchDepositPolicyRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBill);
