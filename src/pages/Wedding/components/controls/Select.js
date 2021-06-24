import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import useStyles from '../../styles';
export default function Select(props) {

    const { name, label, value,error=null, onChange, options, onMouseEnter, onMouseLeave, hover } = props;
    const classes = useStyles();
    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                InputProps={{
                    classes: { root: classes.inputRoot, input: classes.resize, }
                }}
                InputLabelProps={{
                classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                }
                }}
                value={value}
                onMouseLeave={onMouseLeave}
                onChange={onChange}>
                    {options.map(
                        item => (
                        <MenuItem 
                        key={item.id} 
                        value={item.id} 
                        InputProps={{
                    classes: { root: classes.inputRoot, input: classes.resize, }
                }}
                InputLabelProps={{
                classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                }
                }}
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