import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Typography,
  Paper,
  Grid,
  Container,
  Tooltip,
} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import { green, red } from "@material-ui/core/colors";
import {
  HelpOutline,
  EditOutlined,
  CheckCircle,
  Cancel,
} from "@material-ui/icons/";
import DepositDialog from "../../../components/DepositDialog/DepositDialog";
import RefundDialog from "./RefundDialog";
const useStyles = makeStyles((theme) => ({
  billInfo: {
    padding: theme.spacing(2),
    margin: "0px 40px",
    borderRadius: 20,
  },
  billInfoBorder: {
    border: "2px solid black",
    borderRadius: "10px",
  },
  billInfoTitle: {
    backgroundColor: "white",
    position: "absolute",
    top: "910px",
    left: "80px",
    width: "130px",
    justifyContent: "center",
  },
  billInfoContainer: {
    margin: "20px 0px 20px -10px",
    padding: "0px 15px",
  },
  billInfoItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  arrowPopper: arrowGenerator(theme.palette.grey[700]),
  arrow: {
    position: "absolute",
    fontSize: 6,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
  bootstrapPopper: arrowGenerator(theme.palette.common.black),
  bootstrapTooltip: {
    backgroundColor: theme.palette.common.black,
  },
  bootstrapPlacementLeft: {
    margin: "0 8px",
  },
  bootstrapPlacementRight: {
    margin: "0 8px",
  },
  bootstrapPlacementTop: {
    margin: "8px 0",
  },
  bootstrapPlacementBottom: {
    margin: "8px 0",
  },
});

function Payment(props) {
  const nameClasses = useStyles();
  const { classes } = props;
  const { totalServicePrice, totalBill, totalFine, unpaidMoney, feast } =
    props.bill;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRefundOpen, setIsRefundOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOpenRefund = () => {
    setIsRefundOpen(true);
  };

  const handleRefundClose = () => {
    setIsRefundOpen(false);
  };
  return (
    <>
      <RefundDialog
        isOpen={isRefundOpen}
        handleClose={handleRefundClose}
        unpaidMoney={unpaidMoney}
        feast={feast}
        initialValues={{
          totalRefund: feast.weddingRefund,
          refundReason: feast.reasonRefund,
        }}
      />
      <DepositDialog
        isOpen={isOpen}
        handleClose={handleClose}
        initialValues={{ totalDeposit: feast.deposit }}
        bill={props.bill}
        promotions={props.promotions}
        oldPromotions={props.oldPromotions}
        minDepositPercent={props.minDepositPercent}
      />
      <Paper elevation={3} className={nameClasses.billInfo}>
        <div className={nameClasses.billInfoBorder}>
          <Container className={nameClasses.billInfoTitle}>
            <Typography variant="subtitle" align="center">
              Thanh toán
            </Typography>
          </Container>
          <Grid container spacing={2} className={nameClasses.billInfoContainer}>
            <Grid item xs={12}>
              <div className={nameClasses.billInfoItem}>
                <Typography variant="subtitle1">Tổng tiền dịch vụ:</Typography>
                <Typography variant="subtitle1">
                  <NumberFormat
                    value={totalServicePrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                    style={{ marginLeft: "-2px" }}
                  />
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={nameClasses.billInfoItem}>
                <Typography variant="subtitle1">Tổng tiền bàn:</Typography>
                <Typography variant="subtitle1">
                  <NumberFormat
                    value={totalBill}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                    style={{ marginLeft: "-2px" }}
                  />
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={nameClasses.billInfoItem}>
                <Typography
                  variant="subtitle1"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Tổng tiền đặt cọc{" "}
                  {props.isSaved ? (
                    <></>
                  ) : (
                    <EditOutlined
                      style={{
                        fontSize: "18px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      onClick={handleClickOpen}
                    />
                  )}
                </Typography>
                <Typography variant="subtitle1">
                  <NumberFormat
                    value={feast.deposit}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                    style={{ marginLeft: "-2px" }}
                  />
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={nameClasses.billInfoItem}>
                <Tooltip
                  placement="right"
                  style={{ width: window.innerWidth * 0.2 }}
                  title={
                    <div
                      style={{
                        fontSize: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "15px 0",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          marginBottom: "15px",
                          fontSize: "20px",
                          fontWeight: 600,
                        }}
                      >
                        Danh sách khuyến mãi
                      </div>
                      {props.oldPromotions?.map((promotion) => (
                        <div style={{ marginBottom: "10px", lineHeight: 1.2 }}>
                          <CheckCircle
                            style={{ fontSize: "16px", color: green[400] }}
                          />{" "}
                          {promotion?.regime?.description}
                        </div>
                      ))}
                    </div>
                  }
                  classes={{
                    tooltip: classes.bootstrapTooltip,
                    popper: classes.bootstrapPopper,
                    tooltipPlacementLeft: classes.bootstrapPlacementLeft,
                    tooltipPlacementRight: classes.bootstrapPlacementRight,
                    tooltipPlacementTop: classes.bootstrapPlacementTop,
                    tooltipPlacementBottom: classes.bootstrapPlacementBottom,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    Khuyến mãi{" "}
                    {
                      <HelpOutline
                        style={{ fontSize: 18, marginLeft: "10px" }}
                      />
                    }
                  </Typography>
                </Tooltip>
                <Typography variant="subtitle1">
                  <NumberFormat
                    value={feast.regimeRefund}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                    style={{ marginLeft: "-2px" }}
                  />
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={nameClasses.billInfoItem}>
                <Typography variant="subtitle1">Tổng tiền phạt:</Typography>
                <Typography variant="subtitle1">
                  <NumberFormat
                    value={totalFine}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                    style={{ marginLeft: "-2px" }}
                  />
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={nameClasses.billInfoItem}>
                <Typography
                  variant="subtitle1"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Hoàn tiền{" "}
                  {props.isSaved ? (
                    <></>
                  ) : (
                    <EditOutlined
                      style={{
                        fontSize: "18px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      onClick={handleClickOpenRefund}
                    />
                  )}
                </Typography>
                <Typography variant="subtitle1">
                  <NumberFormat
                    value={feast?.weddingRefund ? feast?.weddingRefund : 0}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                    style={{ marginLeft: "-2px" }}
                  />
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={nameClasses.billInfoItem}>
                <Typography variant="subtitle1">Còn lại:</Typography>
                <Typography variant="subtitle1">
                  <NumberFormat
                    value={unpaidMoney}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                    style={{ marginLeft: "-2px" }}
                  />
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </>
  );
}

Payment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Payment);
