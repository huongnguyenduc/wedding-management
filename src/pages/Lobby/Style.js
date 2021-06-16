import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>(
{    
    MainPage:{
        width:'100%',
        minHeight:'calc(100vh - 80px)',
        maxWidth:'100%',
        padding:'0',
        backgroundColor:'#EEEEEE',
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    CategoryPage:{
        width:'100%',
        backgroundColor:"transparent",
        alignSelf:'center',
        boxShadow:'0 60px 80px -35px rgba(239, 215, 215, 0.5)',
    },
    Snackbar:{
        '& .MuiAlert-message':{
            fontSize:'1.5rem'
        },
        "& span":{
            marginLeft:'0'
        },
        zIndex:'2'
    },
    SwitchButton:{
        position:'fixed',
        bottom:'20px',
        right:'60px',
        width:'200px',
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        borderRadius:'50px',
        [theme.breakpoints.down('md')]: {
            right:'20px',
            bottom:'10px',
            width:'150px'
          },
        [theme.breakpoints.down('xs')]: {
           right:'10px',
           bottom:'5px',
           width:'120px'
         },
       
    },
    button:{
        position:'relative',
        width:'50%',
        height:'100%',
        textAlign:'center',
        cursor:'pointer',
        fontSize:'15px',
        fontWeight:'600',
        padding:'10px 0',
        borderRadius:'50px',
        [theme.breakpoints.down('md')]: {
            fontSize:'12px',
            fontWeight:'600',
            padding:'10px 0',
          },
        [theme.breakpoints.down('xs')]: {
            fontSize:'10px',
            fontWeight:'600',
            padding:'7px 0',
          },

    },
    actButton:{
        width:'50%',
        height:'100%',
        backgroundColor:'#060b26',
        color:'#fff'
    },    
}
))

export default useStyles