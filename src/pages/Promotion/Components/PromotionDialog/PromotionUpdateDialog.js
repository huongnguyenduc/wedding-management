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
    alignSelf: "center",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "30em",
  },
}));

const checkIsExistedPercentage = (percentage, promotions) => {
  if (promotions) {
    console.log("promotions ne", promotions, percentage);
    for (let promotion of promotions) {
      // eslint-disable-next-line eqeqeq
      if (promotion.percentage == percentage) return true;
    }
  }
  return false;
};

function PromotionUpdateDialog(props) {
  const { open, handleClose, initialValues, onSubmit, promotions } = props;
  const classes = useStyles();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("percentage" in fieldValues)
      temp.percentage = fieldValues.percentage
        ? checkIsExistedPercentage(fieldValues.percentage, promotions) &&
          // eslint-disable-next-line eqeqeq
          fieldValues.percentage != initialValues.percentage
          ? "Đã tồn tại mốc ưu đãi này"
          : ""
        : "Không được bỏ trống";
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
            if (validate(values)) {
              onSubmit(values);
              console.log(values);
            }
          }}
        >
          <DialogTitle id="form-dialog-title">
            Sửa thông tin khuyến mãi
          </DialogTitle>
          <DialogContent className={classes.form}>
            <Controls.Input
              className={classes.item}
              defaultValue=""
              id="percentage"
              name="percentage"
              label="Mốc ưu đãi"
              value={values.percentage}
              onChange={handleInputChange}
              error={errors.percentage}
              isPercent
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
              description={true}
              multiline
              name="description"
              label="Mô tả"
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
                if (validate(values)) handleClose();
              }}
              color="primary"
              type="submit"
            >
              Cập nhật
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

export default connect(mapStateToProps, null)(PromotionUpdateDialog);
