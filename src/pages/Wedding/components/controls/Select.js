import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value,error=null, onChange, options, onMouseEnter, onMouseLeave, hover } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onMouseLeave={onMouseLeave}
                onChange={onChange}>
                    {options.map(
                        item => (
                        <MenuItem 
                        key={item.id} 
                        value={item.id} 
                        hover={hover? "true" : "false"}
                        onMouseLeave={onMouseLeave} 
                        onMouseEnter={item ? (event) => onMouseEnter(event, item) : () => {}}>
                            {item.name}
                        </MenuItem>)
                    )}
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}