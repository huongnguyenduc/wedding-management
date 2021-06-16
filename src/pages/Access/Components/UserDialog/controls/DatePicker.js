import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

    const { error=null, name, label, value, onChange, className } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                className={className}
                format="dd/MM/yyyy" 
                label={label}
                name={name}
                value={value}
                fullWidth
                onChange={date =>onChange(convertToDefEventPara(name,date))}
                {...(error && {error:true,helperText:error})}

            />
        </MuiPickersUtilsProvider>
    )
}