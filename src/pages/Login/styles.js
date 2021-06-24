import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loginpage:{
   position:'absolute',
   top:'0',
   right:'0',
   width:'100vw',
   height:'max-content',
   zIndex:'3',
   display:'flex',
   flexDirection:'column',
   justifyContent:'center',
   alignContent:'center',
   overflow:'auto',
   backgroundColor:'#909090',
   minHeight:'100vh',
   "&::-webkit-scrollbar": {
    // display: "none"
  }

  },
  LoginContainer:{
    alignSelf:'center',
    backgroundColor:"#fff",
    display:'flex',
    flexDirection:'row',
    flexWrap:'nowrap',
    padding:"0",
    [theme.breakpoints.down('xs')]: {
      flexDirection:'column',
    },
    borderRadius:'5px',
    overflow:'hidden'
  },
  MediaContent:{
    height:'100%',
    overflow:'hidden'
  },
  Image:{
    paddingTop:'100%',
    [theme.breakpoints.down('xs')]: {
      paddingTop:'56.25%',
    },
  },
  TextContent:{
    position:'relative',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    [theme.breakpoints.down('xs')]: {
      justifyContent:'space-between'
    },    
  },
  Title:{
    fontSize:'40px',
    fontFamily:"'Pacifico', cursive",
    textAlign:'center',
    color:'#5f5d5d',
   
  },
  SubTitle:{
    fontSize:"20px",
    fontFamily:"'Mitr', sans-serif",
    textAlign:'center',
    color:'#808080',
    [theme.breakpoints.down('xs')]: {
      marginTop:'2rem'
    },
  },
  LoginForm:{
    padding:"2rem",
    width:''
  },
  txtInfo:{
    "& .MuiInputBase-input":{
      fontSize:'20px'
    }
  },
  InputIcon:{
    fontSize:'20px',
    marginRight:'1rem'
  },
  ButtonContainer:{
    marginTop:'10%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  btnLogin:{
      fontSize:'18px',
      textTransform:"initial",
      fontFamily:"'Mitr', sans-serif",
      color:'#fff',
      backgroundColor:'#696969',
      padding:'3px 35px 5px 35px',
      borderRadius:'20px',
      "& .MuiButton-label":{
        marginLeft:'0'
      },
      "&:hover":{
        color:'#fff',
        backgroundColor:'#777777',
      }
  },
  HiddenTitle:{
    visibility:"hidden",
    [theme.breakpoints.down('xs')]: {
      display:'none'
    },
  },
  errorText:{
    color:"#f44336",
    fontSize:'12px',
    textAlign:"center",
    minHeight:'18px'
  },
  Backdrop:{
    zIndex:theme.zIndex.drawer+99
  }
}
));
export default useStyles