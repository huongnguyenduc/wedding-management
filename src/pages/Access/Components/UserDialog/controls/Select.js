import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value,error=null, onChange, options, className } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})} fullWidth className={className}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                fullWidth
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                    {options.map(
                        item => (
                        <MenuItem 
                        key={item.role} 
                        value={item.role}> 
                            {item.name}
                        </MenuItem>)
                    )}
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}