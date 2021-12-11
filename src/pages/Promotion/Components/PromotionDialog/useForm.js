import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
// function isValidMessage(str) {
//   var messageRegex = /^[a-zA-Z0-9]+$/;
//   return str.match(messageRegex);
// }

const isValidNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

const isValidPercent = (value) => {
  return value >= 0 && value <= 100;
};

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "percentage" && name !== "refund" && name !== "totalRefund") {
      setValues({
        ...values,
        [name]: value,
      });
    }
    if (
      name === "percentage" &&
      ((isValidNumber(value) && isValidPercent(value)) || value === "")
    ) {
      setValues({
        ...values,
        [name]: value,
      });
    }
    if (name === "refund" && (isValidNumber(value) || value === ""))
      setValues({
        ...values,
        [name]: value,
      });
    if (name === "minTotalBill" && (isValidNumber(value) || value === ""))
      setValues({
        ...values,
        [name]: value,
      });
    if (name === "totalRefund" && (isValidNumber(value) || value === ""))
      setValues({
        ...values,
        [name]: value,
      });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
