import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import { HelpOutline, CheckCircle, Cancel } from "@material-ui/icons/";
import NumberFormat from "react-number-format";
import {
  Form,
  useForm,
} from "../../pages/Promotion/Components/PromotionDialog/useForm";
import Controls from "../../pages/Promotion/Components/PromotionDialog/controls/Controls";
import { useDispatch } from "react-redux";
import { actUpdateWeddingMiniRequest } from "../../action";
import { useSnackbar } from "notistack";
import { actUpdatePromotionWeddingRequest } from "../../action/promotionWedding";

const isValidNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

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
  item: {
    width: "50px",
  },
});

const checkIsValidSpecialDate = (organizationDate, promotionDate) => {
  if (promotionDate && organizationDate) {
    // const specialDatePromotions = promotions
    //   .filter((promotion) => promotion.specialDate !== null)
    //   .map((promotion) => promotion.specialDate);
    return organizationDate === promotionDate;
  }
  return false;
};

const checkIsShowOldPromotions = (oldDeposit, newDeposit) => {
  if (oldDeposit > 0 && oldDeposit === newDeposit) return true;
  return false;
};

const checkIsValidPercentPromotion = (
  percentNow,
  percentPromotion,
  promotions
) => {
  if (promotions && percentPromotion) {
    const percentPromotions = promotions
      .filter(
        (promotion) =>
          promotion.percentage !== null && promotion.percentage < percentNow
      )
      .map((promotion) => promotion.percentage);
    return (
      percentPromotion === percentPromotions.reduce((a, b) => Math.max(a, b), 0)
    );
  }
  return false;
};

function convertYMDToDMY(date) {
  if (date == null) return;
  let day = date.substring(8, 10);
  let month = date.substring(5, 7);
  let year = date.substring(0, 4);
  let result = day + "/" + month + "/" + year;
  return result;
}

function convertYMDSymbol(date) {
  if (date == null) return;
  let day = date.substring(8, 10);
  let month = date.substring(5, 7);
  let year = date.substring(0, 4);
  let result = year + "/" + month + "/" + day;
  return result;
}

function DepositDialog({
  isOpen,
  handleClose,
  classes,
  promotions,
  initialValues,
  bill,
  oldPromotions,
  minDepositPercent,
}) {
  const dispatch = useDispatch();
  const [deposit, setDeposit] = React.useState(initialValues.totalDeposit);
  const onDepositChange = (e) => {
    const value = e.target.value;
    if (isValidNumber(value) || value === "") {
      setDeposit(value);
    }
  };
  const { totalServicePrice, totalTablePrice, feast } = bill;
  console.log({ feast });
  const organizationDate = feast
    ? convertYMDToDMY(feast.dateOfOrganization)
    : null;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("totalDeposit" in fieldValues) {
      temp.totalDeposit = fieldValues.totalDeposit
        ? totalServicePrice +
            totalTablePrice -
            fieldValues.totalDeposit -
            calculatePromotionPrice(promotions) <
          0
          ? "Tiền cọc không hợp lệ"
          : (fieldValues.totalDeposit / (totalServicePrice + totalTablePrice)) *
              100 <
            minDepositPercent.minPercentage
          ? `Tiền cọc >= ${minDepositPercent.minPercentage}% giá trị tiệc`
          : ""
        : "Không được bỏ trống";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate
  );
  const depositPercent =
    (values.totalDeposit / (totalServicePrice + totalTablePrice)) * 100;

  const calculatePromotionPrice = (promotions) => {
    let promotionPrice = 0;
    for (let promotion of promotions) {
      if (
        (checkIsValidPercentPromotion(
          depositPercent,
          promotion.percentage,
          promotions
        ) ||
          checkIsValidSpecialDate(organizationDate, promotion.specialDate)) &&
        totalTablePrice + totalServicePrice >= promotion.minTotalBill
      ) {
        promotionPrice += promotion.refund;
      }
    }
    return promotionPrice;
  };
  const calculatePromotions = (promotions) => {
    let idPromotions = [];
    for (let promotion of promotions) {
      if (
        (checkIsValidPercentPromotion(
          depositPercent,
          promotion.percentage,
          promotions
        ) ||
          checkIsValidSpecialDate(organizationDate, promotion.specialDate)) &&
        totalTablePrice + totalServicePrice >= promotion.minTotalBill
      ) {
        idPromotions.push(promotion.id);
      }
    }

    return idPromotions;
  };
  const totalPromotionPrice = React.useMemo(
    () => (promotions ? calculatePromotionPrice(promotions) : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deposit, depositPercent, promotions]
  );

  const totalPromotions = React.useMemo(
    () => (promotions ? calculatePromotions(promotions) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deposit, depositPercent, promotions]
  );

  const totalPayment =
    totalServicePrice +
    totalTablePrice -
    values.totalDeposit -
    totalPromotionPrice;
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, message) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
  };
  const updateDepositSuccess = () => {
    handleClickVariant("success", "Đặt cọc thành công!");
  };

  const updateDepositFailure = () => {
    handleClickVariant("error", "Lỗi hệ thống. Đặt cọc thất bại!");
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) {
            const { totalDeposit } = values;

            const {
              bridename,
              dateOfOrganization,
              groomname,
              id_lobby,
              note,
              phone,
              shift,
              weddingRefund,
              id,
              wedding_date,
              reasonRefund,
            } = feast;
            // let wedding = {
            //   groomName: groomName,
            //   brideName: brideName,
            //   phone: phone,
            //   lobbyName: lobbyName,
            //   weddingDate: convertDateToStringDMY(weddingDate),
            //   dateOfOrganization: convertDateToStringYMD(dateOfOrganization),
            //   nameShift: nameShift,
            //   note: note,
            //   deposit: parseFloat(deposit),
            //   idShift: idShift,
            //   lobbyId: lobbyId,
            // };
            dispatch(
              actUpdateWeddingMiniRequest(
                {
                  deposit: parseFloat(totalDeposit),
                  regimeRefund: totalPromotionPrice,
                  brideName: bridename,
                  dateOfOrganization: convertYMDSymbol(dateOfOrganization),
                  groomName: groomname,
                  id,
                  idShift: shift.id,
                  lobbyId: id_lobby.id,
                  note,
                  nameShift: shift.name,
                  phone,
                  weddingDate: convertYMDToDMY(wedding_date),
                  weddingRefund,
                  lobbyName: id_lobby.name,
                  reasonRefund,
                },
                updateDepositSuccess,
                updateDepositFailure,
                resetForm
              )
            );
            dispatch(
              actUpdatePromotionWeddingRequest({
                feastId: id,
                newRegimeId: totalPromotions,
                oldRegimeId: oldPromotions
                  ? oldPromotions.map((promotion) => promotion.regime.id)
                  : [],
              })
            );
          }
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>Đặt cọc</DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Tổng tiền dịch vụ</span>
            <NumberFormat
              value={totalServicePrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" đ"}
              style={{ marginLeft: "-2px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Tổng tiền hóa đơn</span>
            <NumberFormat
              value={totalTablePrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" đ"}
              style={{ marginLeft: "-2px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Tổng số tiền</span>
            <NumberFormat
              value={totalTablePrice + totalServicePrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" đ"}
              style={{ marginLeft: "-2px" }}
            />
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span>Tổng tiền cọc</span>
            <span style={{ width: "200px", marginRight: "-32px" }}>
              <Controls.Input
                // className={classes.item}
                defaultValue=""
                id="totalDeposit"
                name="totalDeposit"
                value={values.totalDeposit}
                onChange={(e) => {
                  handleInputChange(e);
                  onDepositChange(e);
                }}
                error={errors.totalDeposit}
                isMoney
                noBorder
                textAlignRight
                autoFocus
              />
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Tooltip
              placement="left"
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
                  {checkIsShowOldPromotions(
                    initialValues?.totalDeposit,
                    values?.totalDeposit
                  )
                    ? oldPromotions?.map((promotion) => (
                        <div style={{ marginBottom: "10px", lineHeight: 1.2 }}>
                          <CheckCircle
                            style={{ fontSize: "16px", color: green[400] }}
                          />{" "}
                          {promotion?.regime?.description}
                        </div>
                      ))
                    : promotions.map((promotion) => (
                        <div style={{ marginBottom: "10px", lineHeight: 1.2 }}>
                          {(checkIsValidSpecialDate(
                            organizationDate,
                            promotion.specialDate
                          ) ||
                            checkIsValidPercentPromotion(
                              depositPercent,
                              promotion.percentage,
                              promotions
                            )) &&
                          totalServicePrice + totalTablePrice >=
                            promotion.minTotalBill ? (
                            <CheckCircle
                              style={{ fontSize: "16px", color: green[400] }}
                            />
                          ) : (
                            <Cancel
                              style={{ fontSize: "16px", color: red[400] }}
                            />
                          )}{" "}
                          {promotion.description}
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
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Khuyến mãi{" "}
                {<HelpOutline style={{ fontSize: 18, marginLeft: "2px" }} />}
              </span>
            </Tooltip>
            <NumberFormat
              value={totalPromotionPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" đ"}
              style={{ marginLeft: "-2px" }}
            />
          </div>
          <Divider style={{ marginBottom: "15px" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Tổng thanh toán</span>
            <NumberFormat
              value={totalPayment}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" đ"}
              style={{
                marginLeft: "-2px",
                color: totalPayment < 0 ? red[400] : "black",
              }}
            />
          </div>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 60px",
          }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              color: "#fff",
              backgroundColor: red[400],
              marginRight: "10px",
            }}
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={() => {
              if (validate()) handleClose();
            }}
            variant="contained"
            type="submit"
            style={{
              color: "#fff",
              backgroundColor: green[400],
              marginLeft: "40px",
            }}
          >
            Đặt cọc
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}

DepositDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DepositDialog);
