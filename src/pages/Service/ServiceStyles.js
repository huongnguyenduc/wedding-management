
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>(
{
    ServicePage:{
        backgroundColor:'#EEEEEE',
        marginTop:'80px',
        minWidth:'100vw',
        minHeight:'calc(100vh - 80px)',
        "&::-webkit-scrollbar": {
            display: "none"
          }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 999,
        color: '#fff',
    },
    Header:{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'flex-end',
        flexWrap:'nowrap', 
        position:'fixed',
        top:'80px',
        right:'50%',
        transform:'translateX(50%)',
        zIndex:3,
        padding:'2px 0rem',
        [theme.breakpoints.down('lg')]: {
            padding:'2px 2rem',
        },
        [theme.breakpoints.down('xs')]: {
            padding:'2px 1rem',
        },
        
    },
    HeaderControl:{
        margin:'1rem 0 1rem 0rem',
        [theme.breakpoints.down('xs')]: {
            margin:'0.5rem 0 0.5rem 0rem',
        }, 
    
    },
    PriceControl:{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row',
    },
    SearchControl:{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row', 
        flexWrap:'wrap',
        margin:'0',
        padding:'2px'
    },
    TextSearch:{
        '& .MuiInputBase-input':{
            fontSize:'1.5rem',
            padding:'7px 0px',
            backgroundColor:'#fff'
        },
        "& .MuiOutlinedInput-adornedStart":{
            paddingLeft:'5px',
            backgroundColor:'#fff'
        },
       
    },
    ServicesContainer:
    {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
        padding:'0rem 2rem 0rem 2rem',
        zIndex:'1',
    },
    InsertFab: {
        position: 'fixed',
        bottom: theme.spacing(6),
        right: theme.spacing(6),  
        fontSize:'1.2rem',
        [theme.breakpoints.down('xs')]: {
            bottom: theme.spacing(2),
            right: theme.spacing(3),  
            fontSize:'1rem',
        },      
    },
    InsertContainer:
    {
        position:'relative',
    },
    ButtonPanel:
    {
        position:'absolute',
        top:'0',
        right:'0',
        bottom:'0',
        left:'0',
        margin:'4rem 1.5rem 0 1.5rem',
        borderRadius:'3px',
        backgroundColor:'#575757',
        justifyContent:'center',
        zIndex:'0',
        '&:after':{
            content:'""',
            position:'absolute',
            top:'70%',
            right:'50%',
            width:'70px',
            height:'70px',
            backgroundColor:'#575757',
            transform:'translate(50%, -50%)',
            borderRadius:'50%',
            zIndex:'0'
        }

    },
    ButtonLabel:
    {
        margin: '0'
    },
    InsertButton:{
        position:'absolute',
        top:'70%',
        right:'50%',
        transform:'translate(50%,-50%)',
        padding:'0',
        zIndex:'1'
    },
    Snackbar:{
        '& .MuiAlert-message':{
            fontSize:'1.5rem'
        },
        "& span":{
            marginLeft:'0'
        },
        zIndex: theme.zIndex.drawer + 999,
    },
    SearchButton:{
        padding:'5px'
        // transform:'translateX(100%)'
    },
    SearchControl:{
        
    }
}   
))
export default useStyles