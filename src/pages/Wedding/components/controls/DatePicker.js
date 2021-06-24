import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import useStyles from '../../styles';

export default function DatePicker(props) {

    const { error=null, name, label, value, onChange } = props
    const classes = useStyles();

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                className={classes.textField}
                format="dd/MM/yyyy" 
                label={label}
                name={name}
                value={value}
                fullWidth
                InputProps={{
                    classes: { root: classes.inputRoot, input: classes.resize, }
                }}
                InputLabelProps={{
                classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                }
                }}
                onChange={date =>onChange(convertToDefEventPara(name,date))}
                {...(error && {error:true,helperText:error})}

            />
        </MuiPickersUtilsProvider>
    )
}