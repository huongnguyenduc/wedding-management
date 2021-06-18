
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>(
{
    DialogBackGround:{
        backgroundColor:'rgb(25,25,25,0.6)',
        width:'100vw',
        height:'100vh',
        maxWidth:'100vw',
        maxHeight:'100vh',
        position:'fixed',
        bottom:'50%',
        right:'50%',
        transform:'translate(50% , 50%)',
        zIndex:'2',
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        overflow:'auto'
    },
    DialogBody:{
        position:'relative',
        alignSelf:'center',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        flexWrap:'wrap',
        padding:0,
        boxShadow:'0 70px 40px -35px rgba(51, 51, 51, 0.18)',
        backgroundColor:'#f8f8f8',
        height:'min-content',
        borderRadius:'5px',
        zIndex:'3',
        animation: "$opacity 1s 1"

    },
    "@keyframes opacity": {
        from: { opacity: 0 },
        to: { opacity: 1 }
      }
    ,
    Media:{
        position:'relative',
        '&:hover':{
            '& .BtnImg':{
                opacity:'1'
            }
        }
    },
    Image:{
        position:'absolute',
        top:'0',
        bottom:'0',
        width:'100%',
        [theme.breakpoints.down('xs')]: {
            position:'relative',
            paddingTop:'56.25%',
            width:'100%'
        },
        borderRadius:'5px 0 0 5px',
    },
    BtnImg:{
        position:'absolute',
        top:'50%',
        right:'50%',
        transform:'translate(50%, -50%)',
        cursor:'pointer',
        opacity:'0',
        transition:'opacity 1s ease-out'
    },
    Content:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        padding:'0rem 2rem 0rem 1rem',
        position:'relative'

    },
    Header:{
        display:'flex',
        justifyContent:'flex-end',
        flexDirection:'row',
        flexWrap:'nowrap',
        position:'relative'
    },
    ButtonLabel:
    {
        margin: '0',
    },
    name:{
        fontSize:'3rem',
        fontFamily:'"Raleway", sans-serif',
        "&.MuiInputBase-root.Mui-disabled": {
            color: '#4b4b4b',
        }
    },
    price:{
        fontSize:'4rem',
        fontFamily:'"Patrick Hand", cursive',
        fontWeight:'600',
        color:'#ff9f1a',
        "&.MuiInputBase-root.Mui-disabled": {
            color: '#ff9f1a',
        }
    
    },
    InputLabel:{
        fontSize:'2.5rem',
        fontFamily:'"Raleway", sans-serif',
       
    },
    ListAction:{
        position:'absolute',
        bottom:'0',
        right:'0px',
        zIndex:'3',
        fontWeight:600,
        animation:'$grow 0.3s forwards',
    },
    "@keyframes grow": {
        from: { transform:'translate(0,50%)', opacity:'0.5' },
        to: {transform:'translate(0,100%)', opacity:'1'}
      }
    ,
    listControl:{

    },
    ControlItem:
    {
        '& .MuiTypography-body1':{
            fontSize:'16px',
            fontWeight:'600'
        },
        '& .MuiListItemIcon-root':{
            minWidth:'30px'
        }
    },
    moreInfo:{
        fontSize:'1.8rem',
        fontFamily:'"Raleway", sans-serif',
        paddingLeft:'1rem',
        width:'100%',
        minWidth:'100%',
        height:'100%',
        "&.MuiInputBase-root.Mui-disabled": {
            color: '#4b4b4b',
        },
        marginBottom:'4rem',
    },
    Footer:{
        display:'flex',
        justifyContent:'space-around',
        padding:'1rem',
        position: 'absolute',
        bottom:'0',
        right:'50%',
        transform:'translateX(50%)',
        width:'100%',
        animation: "$Translate 0.3s 1"
    },
    "@keyframes Translate": {
        from: { bottom :'-50px' },
        to: {bottom: 0 }
      },
    ControlButton:{
        fontSize:'15px',
        [theme.breakpoints.down('xs')]: {
            fontSize:'13px',
        },

    }
    
    
}   
))
export default useStyles