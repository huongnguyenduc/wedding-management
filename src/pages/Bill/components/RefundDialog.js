import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core/";
import NumberFormat from "react-number-format";
import { green, red } from "@material-ui/core/colors";
import {
  Form,
  useForm,
} from "../../Promotion/Components/PromotionDialog/useForm";
import { useDispatch } from "react-redux";
import { actUpdateWeddingMiniRequest } from "../../../action";
import { useSnackbar } from "notistack";
import Controls from "../../Promotion/Components/PromotionDialog/controls/Controls";

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

function RefundDialog({
  isOpen,
  handleClose,
  unpaidMoney,
  initialValues,
  feast,
}) {
  const dispatch = useDispatch();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("totalRefund" in fieldValues) {
      temp.totalRefund = fieldValues.totalRefund
        ? unpaidMoney - fieldValues.totalRefund < 0
          ? "Tiền hoàn không hợp lệ"
          : ""
        : "Không được bỏ trống";
    }
    if ("refundReason" in fieldValues) {
      temp.refundReason = fieldValues.refundReason ? "" : "Không được bỏ trống";
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

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, message) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
  };
  const updateRefundSuccess = () => {
    handleClickVariant("success", "Hoàn tiền thành công!");
  };

  const updateRefundFailure = () => {
    handleClickVariant("error", "Lỗi hệ thống. Hoàn tiền thất bại!");
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) {
            const { totalRefund, refundReason } = values;

            const {
              bridename,
              dateOfOrganization,
              groomname,
              id_lobby,
              note,
              phone,
              shift,
              id,
              wedding_date,
              regimeRefund,
              deposit,
            } = feast;
            dispatch(
              actUpdateWeddingMiniRequest(
                {
                  deposit: parseFloat(deposit),
                  regimeRefund,
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
                  weddingRefund: totalRefund,
                  lobbyName: id_lobby.name,
                  reasonRefund: refundReason,
                },
                updateRefundSuccess,
                updateRefundFailure,
                resetForm
              )
            );
          }
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>Hoàn tiền</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              overflow: "hidden",
            }}
          >
            <span>Số tiền hoàn</span>
            <span style={{ width: "190px", marginRight: "-30px" }}>
              <Controls.Input
                defaultValue=""
                autoFocus
                value={values.totalRefund}
                onChange={handleInputChange}
                error={errors.totalRefund}
                id="totalRefund"
                name="totalRefund"
                isMoney
                noBorder
              />
            </span>
          </div>
          {initialValues.totalRefund > 0 &&
          initialValues.totalRefund === values.totalRefund ? (
            <></>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>Tổng thanh toán</span>
              <NumberFormat
                value={unpaidMoney - values.totalRefund}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" đ"}
                style={{
                  marginLeft: "-2px",
                  color:
                    unpaidMoney - values.totalRefund < 0 ? red[400] : "black",
                }}
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span>Lí do</span>
            <TextField
              multiline
              aria-label="minimum height"
              minRows={3}
              name="refundReason"
              value={values.refundReason}
              onChange={handleInputChange}
              {...(errors.refundReason && {
                error: true,
                helperText: errors.refundReason,
              })}
              // value={depositPercent}
              // onChange={onDepositChange}
              style={{ width: "150px", marginRight: "0px" }}
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
            Xác nhận
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}

export default RefundDialog;
