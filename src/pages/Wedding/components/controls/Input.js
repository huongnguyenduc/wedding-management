import React from 'react'
import { TextField } from '@material-ui/core';
import useStyles from '../../styles';
import NumberFormat from 'react-number-format';
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
      style={{marginLeft: "-2px"}}
    />
  );
}

export default function Input(props) {

    const classes = useStyles();
    const { name, label, value, error=null, onChange, inputProps, isMoney } = props;
    return (
        isMoney ? 
        <TextField
            variant="outlined"
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            className={classes.textField}
            InputProps={{
                inputComponent: NumberFormatCustom,
                classes: { root: classes.inputRoot }
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
              }
            }}
            {...(error && {error:true,helperText:error})}/> : 
        <TextField
            variant="outlined"
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            className={classes.textField}
            InputProps={{
                classes: { root: classes.inputRoot }
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
              }
            }}
            {...(error && {error:true,helperText:error})}
        />
    )
}