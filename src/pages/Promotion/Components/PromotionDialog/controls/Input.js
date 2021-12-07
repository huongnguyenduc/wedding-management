import React from "react";
import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix=" đ"
      style={{ marginLeft: "-2px", textAlign: "right" }}
    />
  );
}

function PercentFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      suffix=" %"
      style={{ marginLeft: "-2px" }}
    />
  );
}

export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    isPercent,
    className,
    isMoney,
    disabled,
    noBorder,
    autoFocus,
    textAlignRight,
  } = props;
  return isMoney ? (
    <TextField
      autoFocus={autoFocus}
      className={className}
      variant={noBorder ? "standard" : "outlined"}
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      inputProps={{
        style: { textAlign: textAlignRight ? "right" : "left" },
      }}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      {...(error && { error: true, helperText: error })}
    />
  ) : (
    <TextField
      className={className}
      variant="outlined"
      fullWidth
      disabled={disabled}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      InputProps={{
        inputComponent: isPercent ? PercentFormatCustom : undefined,
      }}
      {...(error && { error: true, helperText: error })}
    />
  );
}
