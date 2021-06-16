import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>(
{    
    page:{
        width:'100%',
        height:'100%',
        maxWidth:'100%',
        padding:'0',
        backgroundColor:'#EEEEEE'
    },
    TabPanel:{
        backgroundColor:'transparent',
        [theme.breakpoints.down('xs')]: {
            '& .MuiBox-root':{
                paddingLeft:'10px',
                paddingRight:'10px'
            }
        },
    },
    container:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        backgroundColor:'transparent',
        paddingLeft:'60px',
        paddingRight:'60px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft:'0px',
            paddingRight:'0px',
        },
    },
    ButtonEnd:{
        position:'fixed',
        right:'15px',
        bottom:'70px',
        padding:'0',
        [theme.breakpoints.down('sm')]: {
           display:'none'
        },
    },
    ButtonTop:{
        position:'fixed',
        right:'15px',
        top:'70px',
        padding:'0',
        [theme.breakpoints.down('sm')]: {
            display:'none'
         },
    },
    AppBar:{
        position:'relative',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'no-wrap',
        backgroundColor:'#060b26',
        "& .SearchButton":{
            color:'#fff'
        },
    },
    AppBarScroll:{
        position:'fixed',
        top:0,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'no-wrap',
        backgroundColor:'#060b26',
        "& .SearchButton":{
            color:'#fff'
        }
    },
    Tab:{
        fontSize:'13px',
        fontWeight:'500',
    },
    LabelButton:{
        marginLeft:'0'
    },
    SearchButton:{
        marginLeft:'2rem',
    },
    SearchIcon:{
        fontSize:'30px',
        color:'#fff'  
    },
    actSearchIcon:{
        fontSize:'30px',
        color:'#ea2618' 
    },
    SearchBox:{
        position:'absolute',
        top:'100%',
        right:'0',
        width:'40%',
        minWidth:'40%',
        backgroundColor:'#fff',
        animation: "$grow 0.3s ease-out" ,
        [theme.breakpoints.down('md')]: {
            minWidth:'60%',
            width:'60%',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth:'100%',
            width:'100%',
        },

    },
    TextSearch:{
        "& .MuiInputBase-input":{
            fontSize:'18px',
            padding:'7px 15px'
        }
        
    },
    "@keyframes grow": {
        from: { 
            opacity:'0',
            transform:'scaleX(0)'
     },
        to: { 
            opacity:'1',
            transform:'scaleX(1)'
         }
      },
    
}
))

export default useStyles