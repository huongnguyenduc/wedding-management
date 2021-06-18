import React,{useState}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import Paper from '@material-ui/core/Paper';
import theme from './MuiTheme';
import {MuiThemeProvider} from '@material-ui/core';
import { useHistory } from 'react-router';
import AuthService from './AuthService'


 function Login() {

  const classes = useStyles();


  let history = useHistory();
  const [success,setSucces] = useState(true)
  const [values, setValues] = useState({
    username:'',
    password:''
  })

  const [error, setError] = useState({
    username:'',
    password:''
  })


  const validate = (fieldvalues = values)=>{
    let err = {...error};
    if('username' in fieldvalues)
      err.username=fieldvalues.username?'':'Vui lòng nhập Tên đăng nhập!';
    if('password' in fieldvalues)
      err.password = fieldvalues.password?'':'Vui lòng nhập mật khẩu!';
      setError({...err});
      if(fieldvalues===values)
        return Object.values(err).every(x=> x==='');
  }

  const HandleInputChange=(e)=>
  {
    const {name, value} = e.target;
    setValues({...values,[name]:value});
  }

  const HandleSubmit=(e)=>
  {
    e.preventDefault()
    if(validate())
    {
      setError({
        username:'',
        password:''
      })
      Submit(); 
    }
    else
      return;
     
  }

  const Submit=()=>
  {
    if(AuthService.login({username: values.username,password: values.password}))
    {
      //Dang nhap thanh cong
      history.replace('/Wedding')
      setSucces(true);
    }
    else
    {
      //Dang nhap khong thanh cong
      console.log(AuthService.login({username: values.username,password: values.password}))
      setSucces(false);
    }
  }
  return (
    <MuiThemeProvider theme={theme}>
    <Grid Container component="main" className={classes.loginpage}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.img}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} square>  
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Typography className={classes.labelError} component="h2" hidden={success?true:false}>
            Tên đăng nhập hoặc mật khẩu không đúng!
          </Typography>
          <form className={classes.form}  onSubmit={HandleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={HandleInputChange}
              error= {error.username?true:false}
              helperText ={error.username}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={HandleInputChange}
              error ={error.password?true:false}
              helperText={error.password}
            />   
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
            <Link to='/SignUp' >
                Đăng ký tài khoản mới
            </Link>
          </form>
        </div>
      </Grid>
    </Grid>
    </MuiThemeProvider>
  );
}

export default Login