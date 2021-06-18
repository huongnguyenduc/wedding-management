import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, error=null, onChange, inputProps, className } = props;
    return (
        <TextField
            className={className}
            variant="outlined"
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            InputProps={inputProps}
            
            {...(error && {error:true,helperText:error})}
        />
    )
}