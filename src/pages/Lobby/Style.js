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
        borderRadius:'50px'
       
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
        borderRadius:'50px'

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