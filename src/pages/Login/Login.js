import React,{useState}from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import {CardMedia, Backdrop} from '@material-ui/core';
import { useHistory } from 'react-router';
import { Container } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { InputAdornment } from '@material-ui/core';
import { LockOpen } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import {login} from './AuthService';
import Slide from '@material-ui/core/Slide';


 function Login() {

  const classes = useStyles();


  let history = useHistory();
  const [status,setStatus] = useState({open:false, severiry:'', message:'',name:''})
  const [pending, setPending] = useState(false)
  const [account, setAccount] = useState({
    username:'',
    password:''
  })

  const HandleInputChange=(e)=>
  {
    const {name, value} = e.target;
    setAccount({...account,[name]:value});
  }

  function afterlogin(data)
  {
    setPending(false)
    if(data.status==='success')
    {
      history.replace('/')
    }
    else if(data.status ==='wrong')
    {
      setStatus({open:true,pending:false, severiry:'error', message:'Tên đăng nhập hoặc mật khẩu không đúng!'})
    }
    else if(data.status ==='error')
    {
      setStatus({open:true,pending:false, severiry:'error', message:'Lỗi đường truyền!'})
    }

    return false
  } 

  function validate()
  {
    if(account.username==='')
    {
      setStatus({open:true, severiry:'error', message:'Tên đăng nhập không được để trống',name:'username'})
      return false
    }
    if(account.password==='')
    {
      setStatus({open:true, severiry:'error', message:'Mật khẩu không được để trống',name:'password'})
      return false
    }
    return true;
  }

  function LoginHandler()
  {
    if(validate())
    {
      setPending(true)
      login(account, afterlogin)
    }
      
  }


  return (
    <Grid component="main" className={classes.loginpage}>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Mitr&family=Pacifico&display=swap" rel="stylesheet"/>
      <Backdrop open={pending} className={classes.Backdrop}>
        <CircularProgress style={{fontSize:'30px'}}/>
      </Backdrop>
      <Container maxWidth='lg' className={classes.LoginContainer}  >
          
          <Grid item xs={12} sm={6} md={7} lg={7} className={classes.MediaContent}>
            <CardMedia
              image= 'https://images-na.ssl-images-amazon.com/images/I/61EZdcgqknL.jpg'
              className={classes.Image}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5} className={classes.TextContent}>
            <Typography className={classes.Title}>Quản lý tiệc cưới</Typography>
            <Grid>
              <Typography className={classes.SubTitle}>Đăng nhập</Typography>
              <Typography style={{visibility:status.open?'visible':'hidden'}} className={classes.errorText}>{status.message}</Typography>
              <Container maxWidth='xs' className={classes.LoginForm}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder='Tên đăng nhập'
                    autoFocus
                    onChange={HandleInputChange}
                    error={status.name==='username'}
                    className={classes.txtInfo}
                    InputProps={{
                      startAdornment:<InputAdornment>
                        <PersonIcon className={classes.InputIcon}/>
                      </InputAdornment>
                    }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder='Mật khẩu'
                  onChange={HandleInputChange}
                  className={classes.txtInfo}
                  error={status.name==='password'}
                  InputProps={{
                    startAdornment:<InputAdornment>
                      <LockOpen className={classes.InputIcon}/>
                    </InputAdornment>
                  }}
                  />  
                  <Grid className={classes.ButtonContainer}>
                    <Button
                      className={classes.btnLogin}
                      onClick={LoginHandler}
                    >
                    Đăng nhập
                    </Button>
                </Grid> 
              </Container>
          </Grid>
            
            <Typography className={classes.HiddenTitle} >Quản lý tiệc cưới</Typography>
          </Grid>
      </Container>
    </Grid>
  );
}

export default Login
