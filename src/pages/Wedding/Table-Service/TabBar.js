import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Fab } from "@material-ui/core/";
import { lightBlue } from "@material-ui/core/colors";
import {
  ArrowBack,
  AttachMoneyOutlined,
  AccountBalanceWallet,
} from "@material-ui/icons";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { actGetNotPaidBillRequest } from "./../../../action/notPaidBill";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import Table from "./Table";
import Service from "./OrderService/Service";
import { Link } from "react-router-dom";
import DepositDialog from "../../../components/DepositDialog/DepositDialog";
import { actFetchPromotionsRequest } from "../../../action/promotion";
import { actFetchPromotionWeddingsRequest } from "../../../action/promotionWedding";
import { actFetchDepositPolicyRequest } from "../../../action/depositPolicy";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "130px",
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  indicator: {
    backgroundColor: "#FC5404",
    height: "5px",
    borderRadius: 10,
  },
}));
function TableServiceTabBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClickOpen = () => {
    props.getNotPaidBill(props.weddingId);
    props.getPromotions();
    props.getPromotionWeddings(props.weddingId);
    props.getDepositPolicy();
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  React.useEffect(() => {
    props.getNotPaidBill(props.weddingId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("bill", props.bill);
  return (
    <div className={classes.root}>
      <DepositDialog
        isOpen={isOpen}
        handleClose={handleClose}
        promotions={props.promotions}
        oldPromotions={props.promotionWeddings}
        initialValues={{ totalDeposit: 0 }}
        bill={props.bill}
        minDepositPercent={props.depositPolicy}
      />
      {props.bill && props.bill?.feast?.deposit === 0 ? (
        <Fab
          color="secondary"
          aria-label="add"
          variant="extended"
          onClick={handleClickOpen}
          style={{
            position: "fixed",
            bottom: "120px",
            right: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AccountBalanceWallet style={{ color: lightBlue[50] }} />
          <span
            style={{
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              marginLeft: "6px",
            }}
          >
            Đặt cọc
          </span>
        </Fab>
      ) : (
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          style={{
            position: "fixed",
            bottom: "40px",
            right: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            to={`/bill/${props.weddingId}`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AttachMoneyOutlined style={{ color: lightBlue[50] }} />
            <span
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                marginLeft: "6px",
              }}
            >
              Thanh toán
            </span>
          </Link>
        </Fab>
      )}
      <AppBar
        position="static"
        style={{
          backgroundColor: "#060b26",
          position: "fixed",
          top: 80,
          left: 0,
          transition: "top 0.3s",
          zIndex: 1,
        }}
        id="appBarTable"
      >
        <Tabs
          classes={{ indicator: classes.indicator }}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Link to="/wedding">
            <IconButton edge="start" className={classes.backButton}>
              <ArrowBack style={{ color: lightBlue[50] }} />
            </IconButton>
          </Link>
          <Tab label="Thông tin đặt bàn" {...a11yProps(0)} />
          <Tab label="Thông tin đặt dịch vụ" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
        <Table
          weddingId={props.weddingId}
          lobbyId={props.lobbyId}
          status={props.status}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Service
          weddingId={props.weddingId}
          lobbyId={props.lobbyId}
          status={props.status}
        />
      </TabPanel>
    </div>
  );
}

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     resetTableClickRow: () => {
//       dispatch(clickRowTable([]));
//     },
//     changeNormalTableState: () => {
//       dispatch(normalState());
//     },
//     fetchAllFoods: () => {
//       dispatch(actFetchFoodsRequest());
//     },
//     fetchAllTableFoods: (tableFoodId) => {
//       dispatch(actFetchTableFoodsRequest(tableFoodId));
//     },
//     addTable: (table, addTableSuccess, addTableFailure) => {
//       dispatch(actAddTableRequest(table, addTableSuccess, addTableFailure));
//     },
//     editTable: (table, updateTableSuccess, updateTableFailure) => {
//       dispatch(
//         actUpdateTableRequest(table, updateTableSuccess, updateTableFailure)
//       );
//     },
//     fetchAllTablesInfo: (idWedding) => {
//       dispatch(actFetchTablesRequest(idWedding));
//     },
//     fetchAllTableCategoriesInfo: () => {
//       dispatch(actFetchTableCategoriesRequest());
//     },
//     getLobby: (idLobby) => {
//       dispatch(actGetLobbyRequest(idLobby));
//     },
//   };
// };

const mapDispatchToProps = (dispatch, props) => {
  return {
    getNotPaidBill: (id) => {
      dispatch(actGetNotPaidBillRequest(id));
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

const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    bill: state.notPaidBillItem,
    promotions: state.promotions,
    promotionWeddings: state.promotionWeddings,
    depositPolicy: state.depositPolicy,
    // currentTableState: state.tableState,
    // tableCategories: state.tableCategories,
    // selectedWedding: state.selectedRow,
    // selectedTable: state.selectedRowTable,
    // lobbies: state.lobbies,
    // recentLobby: state.lobbyItem,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableServiceTabBar);
