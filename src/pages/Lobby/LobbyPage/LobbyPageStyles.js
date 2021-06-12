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
    },
    container:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        backgroundColor:'transparent',
        paddingLeft:'60px',
        paddingRight:'60px'
    },
    ButtonEnd:{
        position:'fixed',
        right:'15px',
        bottom:'70px',
        padding:'0'
    },
    ButtonTop:{
        position:'fixed',
        right:'15px',
        top:'70px',
        padding:'0'
    },
    AppBar:{
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
        bottom:'0',
        right:'0',
        width:'30%',
        transform:'translate(-2rem ,100%)',
        backgroundColor:'#fff',
        animation: "$grow 0.3s forwards" 
    },
    TextSearch:{
        "& .MuiInputBase-input":{
            fontSize:'18px',
            padding:'7px 15px'
        }
        
    },
    "@keyframes grow": {
        from: { width:'5%' },
        to: {  width:'30%' }
      },
    
}
))

export default useStyles