import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme=>(
{
    Header:{
        width:'100%', 
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'nowrap',
        alignContent:'center',
        height:'40px',
        position:'fixed',
        top:'80px',
        left:'0',
        zIndex:3
    },
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
    SearchBox:{
        position:'absolute',
        top:'100%',
        right:'0',
        width:'30%',
        minWidth:'30%',
        animation:"$First_animation 0.3s ease-out",
        backgroundColor:'#f8f8f8',
        [theme.breakpoints.down('md')]: {
            minWidth:'60%',
            width:'60%',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth:'100%',
            width:'100%',
        },
        
    },
    "@keyframes First_animation":{
        from:{
            opacity:'0',
            transform: 'scale(0.5)'
        },
        to:{
           opacity:'1',
           transform: 'scale(1)'
        }
    },

    tfMoreInfo:
    {
        fontSize: '2rem',
        color:'#4b4b4b',
        fontFamily:"Open Sans", 
    },
    button:{
        padding:'5px'
    },
    buttonLabel:{
        marginLeft:'0'
    }   
    
}
))

export default useStyles