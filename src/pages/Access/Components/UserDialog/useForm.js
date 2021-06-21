import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
function isvalid(str) {
  var usernameRegex = /^[a-zA-Z0-9]+$/;
  return str.match(usernameRegex);
}
export function useForm(initialFValues, validateOnChange = false, validate) {

    
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        if (name !== 'username') {
            setValues({
            ...values,
            [name]: value
        })
        }
        if (name === 'username' && (isvalid(value) || value===""))
        {
            setValues({
            ...values,
            [name]: value
        })}
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}