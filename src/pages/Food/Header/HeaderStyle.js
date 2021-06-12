import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme=>(
{
    MenuContainer:
    {
        width:'100%', 
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'nowrap',
        alignContent:'center',
        height:'40px',
    },
    MenuTabs:
    {
        "& .MuiTabs-scroller .MuiTabs-flexContainer .MuiButtonBase-root .MuiTab-wrapper":
        {
            fontFamily:'"KoHo", sans-serif',
            fontWeight:'750',
            letterSpacing:'3px'
        },
        '& .Mui-selected':
        {
            opacity:'0.7'
        },
        '& span':
        {
            height:'0px'
        },
        '& a':
        {
            fontSize:'1.8rem',
            fontWeight:'700'
        }

    },
    Tab:
    {
        margin:'0rem 1rem 0rem 1rem',
        paddingBottom:'5px',
        minWidth:'150px',  
        cursor: "pointer", 
    },
    activeTab:
    {   
        fontFamily:'2rem',
        color:'red',
    },
    tfMoreInfo:
    {
        fontSize: '2rem',
        color:'#4b4b4b',
        fontFamily:"Open Sans", 
        alignContent:'center',
        alignItem:'center',
        marginTop:'6px',
        marginBottom:'0',
        marginRight:'8rem'
    },   
    
}
))

export default useStyles