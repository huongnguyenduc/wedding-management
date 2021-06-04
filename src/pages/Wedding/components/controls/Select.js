import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value,error=null, onChange, options, onMouseEnter, onMouseLeave, hover, handleClickOpen } = props;

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
                        onMouseEnter={item.moreInfo ? (event) => onMouseEnter(event, item.moreInfo) : () => {}}>
                            {item.name}
                        </MenuItem>)
                    )}
                    {handleClickOpen ? <MenuItem onClick={handleClickOpen}>
                            Thêm loại bàn
                    </MenuItem> : <></>}
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}