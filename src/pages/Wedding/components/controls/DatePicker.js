import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import useStyles from '../../styles';

export default function DatePicker(props) {

    const { name, label, value, onChange } = props
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
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                onChange={date =>onChange(convertToDefEventPara(name,date))}

            />
        </MuiPickersUtilsProvider>
    )
}