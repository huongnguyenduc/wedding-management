import React from 'react'
import { TextField } from '@material-ui/core';
import useStyles from '../../styles';

export default function Input(props) {

    const classes = useStyles();
    const { name, label, value, error=null, onChange, inputProps } = props;
    return (
        <TextField
            variant="outlined"
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            className={classes.textField}
            InputProps={inputProps}
            
            {...(error && {error:true,helperText:error})}
        />
    )
}