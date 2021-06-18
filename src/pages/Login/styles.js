import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loginpage:{
    position:"absolute",
    top: '0',
    width: '100%',
    height: '100%',
    display:'flex',
    flexDirection:"row"
  },
  labelError:{
    color:'#e74c3c',
  },
  img:
  {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.light: theme.palette.primary.dark,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8,3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },

  radioGroup:{
    marginTop: theme.spacing(1),
    display:'flex',
    flexDirection:'row',
    flexWrap:'nowrap',
    alignItems: 'center',
    justifyContent:'flex-start',
    
  },
  lableForm:{
    fontSize: 18,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default useStyles