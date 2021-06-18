import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {FormLabel,FormControlLabel} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link, useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles'
import theme from './MuiTheme';
import Paper from '@material-ui/core/Paper';
import {MuiThemeProvider} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { Form } from 'semantic-ui-react';


 function SignUp(event) {
  let history = useHistory();
  const classes = useStyles();
  const [signUpFail,setSignUpFail] = React.useState(false);
  const [values, setValues] = React.useState({
      fullName: '',
      phone: '',
      identity: '',
      spawnDate: new Date(),
      password: '',
      address: '',
      role:'staff'

  });
  const [error, setError] = React.useState({
      fullName: '',
      phone: '',
      identity: '',
      spawnDate: '',
      password: '',
      address: ''
  });

  const validate =(fieldValues = values) =>
  {
    var checkPhone =/(^(0|\+84)(86|96|97|98|32|33|34|35|36|37|38|39|88|91|94|83|84|85|81|82|89|90|93|70|79|77|76|78|92|56|58|99|59)([0-9]{7})\b)/g;
    var checkIdentity = /(^(([0-9]{9})|([0-9]{12})|([0-9]{16}))\b)/g;
    let err = {...error};
    if('fullName' in fieldValues)
      err.fullName = fieldValues.fullName?'':'Vui lòng nhập họ và tên của bạn!';
      
    if('phone' in fieldValues)
      if(fieldValues.phone)
        err.phone = checkPhone.test(fieldValues.phone)?'':'Vui lòng nhập số điện thoại hợp lệ!';
      else 
        err.phone = 'Vui lòng nhập số điện thoại của bạn!';

    if('identity' in fieldValues)
      if(fieldValues.identity)
        err.identity = checkIdentity.test(fieldValues.identity)?'':'Vui lòng nhập số CMND, CCCD hợp lệ!';
      else
        err.identity = 'Vui lòng nhập số CMND, CCCD của bạn';

    if('password' in fieldValues)
      err.password = (fieldValues.password.length >= 6)?'':'Mật khẩu phải có ít nhất 6 kí tự!' ;

    if('spawnDate' in fieldValues)
    {
      if(fieldValues.spawnDate)
      { 
        var spawn = fieldValues.spawnDate;
        spawn.setHours(0,0,0,0);
        var now = new Date();
        now.setHours(0,0,0,0);
        if(now <= spawn)
          err.spawnDate = 'Vui lòng nhập đúng ngày sinh!';
        else
          err.spawnDate = '';
      }
      else
        err.spawnDate='Vui lòng nhập ngày sinh của bạn!'
        
    }

    if('address' in fieldValues)
      err.address = fieldValues.address?'':'Vui lòng nhập địa chỉ của bạn!';

    setError({...err});

    if(fieldValues === values)
      return Object.values(err).every(x => x ==='')
  }
  
  
  const HandleChangeDate =e=>
  {
    setValues({...values,spawnDate:e})
    validate({spawnDate:e})
  }

  const HandleInputChange =(e)=>
  {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value
    })
    validate({ [name]: value })        
  }

  const handleSubmit = e => {
    e.preventDefault()
        if (validate()){
          setError(
            {
              fullName: '',
              phone: '',
              identity: '',
              spawnDate: '',
              password: '',
              address: ''
            }
            );

          Submit()
         
        }
}

const Submit=()=>
  {
    if(true)
    {
      //Dang nhap thanh cong
      history.replace('/Login');
      console.log('success')
      setSignUpFail(false);
    }
    else
    {
      console.log('faild');
      //Dang nhap khong thanh cong
      setSignUpFail(true);
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
    <Grid container component="main" className={classes.loginpage} >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.img}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography component="h2" className={classes.labelError} hidden={signUpFail?false:true}>
          Đăng ký không thành công!
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >   
              <TextField
                name="fullName"
                variant="outlined"
                margin="normal"
                fullWidth
                id="fullName"
                label="Họ và Tên"
                autoComplete
                autoFocus
                onChange={HandleInputChange}
                onBlur={HandleInputChange}
                error = {error.fullName?true:false}
                helperText = {error.fullName}
              />
             <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="phone"
                label="Số điện thoại"
                name="phone"
                autoComplete
                onChange ={HandleInputChange}
                onBlur={HandleInputChange}
                error = {error.phone?true:false}
                helperText={error.phone}
              />
             <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                onChange={HandleInputChange}
                onBlur={HandleInputChange}
                error ={error.password?true:false}
                helperText= {error.password}
                autoComplete
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="identity"
                label="Số CMND/CCCD"
                id="indentity"
                onChange={HandleInputChange}
                onBlur={HandleInputChange}
                error = {error.identity?true:false}
                helperText={error.identity}
                autoComplete
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker 
                  inputVariant="outlined"
                  margin="normal"
                  fullWidth
                  name="spawnDate"
                  label="Ngày sinh"
                  id="spawnDate"
                  format="dd/MM/yyyy"
                  onChange={HandleChangeDate}
                  onBlur={()=>{validate({spawnDate:values.spawnDate})}}
                  value={values.spawnDate || ''}
                  error = {error.spawnDate?true:false}
                  helperText ={error.spawnDate}   
                  autoComplete        
                />
              </MuiPickersUtilsProvider>
             
            
              <TextField 
                variant="outlined"
                margin="normal" 
                fullWidth
                name="address"
                label="Địa chỉ"
                type="text"
                id="address"
                onChange = {HandleInputChange}
                onBlur={HandleInputChange}
                error= {error.address?true:false}
                helperText ={error.address}
                autoComplete
              />
              <Form className={classes.radioGroup}>
                <FormLabel className={classes.TextField}>Quyền truy cập</FormLabel>
                <RadioGroup row name='role' id='name' lable='Quyền truy cập' defaultValue='staff' onChange = {HandleInputChange}>
                  <FormControlLabel value="staff" control={<Radio />} label="Nhân viên"/>
                  <FormControlLabel value="admin" control={<Radio />} label="Quản lý"/>
                </RadioGroup>
              </Form>
              
          <Button
            type ='submit'
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng ký
          </Button>
          <Grid container justify="flex-end">
              <Link to="/login" variant='body2' >
                Đăng nhập tài khoản hiện có.
              </Link>
            </Grid>
            
          
        </form>
      </div>
      </Grid>
    </Grid>
    </MuiThemeProvider>
  );
}

export default SignUp