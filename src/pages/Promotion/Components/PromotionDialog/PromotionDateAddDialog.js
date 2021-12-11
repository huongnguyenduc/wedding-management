import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core/";
import { Form, useForm } from "./useForm";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./controls/Controls";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "30em",
  },
}));

const checkIsExistedSpecialDate = (specialDate, promotions) => {
  if (promotions) {
    console.log("promotions ne", promotions, specialDate);
    for (let promotion of promotions) {
      // eslint-disable-next-line eqeqeq
      if (promotion.specialDate == specialDate) return true;
    }
  }
  return false;
};

function convertDateToStringDMY(date) {
  if (date == null) return;
  let day = date.getDate();
  console.log(date);
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let result =
    (day.toString().length === 1 ? "0" + day.toString() : day.toString()) +
    "/" +
    (month.toString().length === 1
      ? "0" + month.toString()
      : month.toString()) +
    "/" +
    year; // That's your formatted date.
  console.log(result);
  return result;
}

function PromotionAddDialog(props) {
  const { open, handleClose, initialValues, onSubmit, promotions } = props;
  const classes = useStyles();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("specialDate" in fieldValues) {
      temp.specialDate = fieldValues.specialDate
        ? checkIsExistedSpecialDate(
            convertDateToStringDMY(fieldValues.specialDate),
            promotions
          )
          ? "Đã tồn tại ngày ưu đãi này"
          : ""
        : "Không được bỏ trống";
    }
    if ("refund" in fieldValues) {
      temp.refund = fieldValues.refund ? "" : "Không được bỏ trống";
    }
    if ("minTotalBill" in fieldValues) {
      temp.minTotalBill = fieldValues.minTotalBill ? "" : "Không được bỏ trống";
    }
    if ("description" in fieldValues)
      temp.description = fieldValues.description ? "" : "Không được bỏ trống";
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

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onEnter={resetForm}
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (validate()) {
              const { refund, description, specialDate, minTotalBill } = values;
              onSubmit({
                description,
                specialDate: convertDateToStringDMY(specialDate),
                percentage: null,
                refund: parseInt(refund),
                minTotalBill: parseInt(minTotalBill),
              });
            }
          }}
        >
          <DialogTitle id="form-dialog-title">Thêm khuyến mãi mới</DialogTitle>
          <DialogContent className={classes.form}>
            <Controls.DatePicker
              className={classes.item}
              defaultValue=""
              id="specialDate"
              name="specialDate"
              label="Ngày ưu đãi"
              value={values.specialDate}
              onChange={handleInputChange}
              error={errors.specialDate}
            />
            <Controls.Input
              className={classes.item}
              defaultValue=""
              id="minTotalBill"
              name="minTotalBill"
              label="Giá trị tiệc tối thiểu"
              value={values.minTotalBill}
              onChange={handleInputChange}
              error={errors.minTotalBill}
              isMoney
            />
            <Controls.Input
              className={classes.item}
              defaultValue=""
              id="refund"
              name="refund"
              label="Giá trị khuyến mãi"
              value={values.refund}
              onChange={handleInputChange}
              error={errors.refund}
              isMoney
            />
            <Controls.Input
              className={classes.item}
              defaultValue=""
              id="description"
              name="description"
              label="Mô tả"
              multiline
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hủy bỏ
            </Button>
            <Button
              onClick={() => {
                if (validate()) handleClose();
              }}
              color="primary"
              type="submit"
            >
              Thêm mới
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    promotions: state.promotions,
  };
};

export default connect(mapStateToProps, null)(PromotionAddDialog);
