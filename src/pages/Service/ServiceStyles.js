
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>(
{
    Header:{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-around',
        flexWrap:'wrap',
        
    },
    HeaderScroll:{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-around',
        flexWrap:'wrap',
        position:'fixed',
        top:'0',
        right:'50%',
        transform:'translateX(50%)',
        zIndex:'2',
        backgroundColor:'#ffffff'
    },
    HeaderControl:{
        margin:'1rem 0 1rem 0rem'
    
    },
    PriceControl:{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row',
    },
    ControlItem:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        margin:'1rem 0'
    },
    LabelPrice:{
        display:'flex',
        fontSize:'1.5rem',
        fontWeight:'700',
        justifyContent:'center',
        alignSelf:'center',
        paddingRight:'5px'
    },
    btnApply:{
        marginLeft:'0.5rem',
        fontSize:'1.2rem',
        fontWeight:700,
        minWidth:'75px'

    },
    SortControl:{
        display:'flex',
        flexWrap:'nowrap',
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    SortLabel:{
        minWidth:'70px',
        fontSize:'1.5rem',
        fontWeight:'700',
        alignSelf:'center'
    },
    SelectSort:{
        fontSize:'1.5rem',
        '& .MuiOutlinedInput-input':{
            padding:'7px 20px 7px 7px'
        },
        minWidth:'70px'
        
    },
    tfPrice:{
        '& .MuiInputBase-input':{
            fontSize:'1.5rem',
            padding:'7px'
        },
        minWidth:'70px',
    },
    SearchControl:{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    TextSearch:{
        '& .MuiInputBase-input':{
            fontSize:'1.5rem',
            padding:'7px',
        },
        minWidth:'150px'
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
        fontSize:'1.2rem'      
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
        zIndex:'2'
    }
}   
))
export default useStyles