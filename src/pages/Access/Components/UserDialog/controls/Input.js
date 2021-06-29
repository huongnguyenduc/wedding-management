import React from 'react'
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function Input(props) {
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const { name, label, value, error=null, onChange, inputProps, className, password, disabled } = props;
    return (
        password ?
        <FormControl className={className} variant="outlined" fullWidth autoComplete={false}>
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <OutlinedInput
            label={label}
            name={name}
            inputProps={{
                autocomplete: 'new-password',
                form: {
                autocomplete: 'off',
                },
            }}
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={value}
            fullWidth
            onChange={onChange}
            style={{backgroundColor: "#fff"}}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
            labelWidth={80}
            />
            {!!error && (
                <FormHelperText error id="input-error">
                {error}
                </FormHelperText>
            )}
        </FormControl>
        : <TextField
            className={className}
            variant="outlined"
            fullWidth
            disabled={disabled}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            InputProps={inputProps}
            
            {...(error && {error:true,helperText:error})}
        />
    )
}