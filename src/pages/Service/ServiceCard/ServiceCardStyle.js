
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>(
{
    ServiceContainer:
    {
        position:'relative',
        padding:'0 1.5rem 0 1.5rem',
        marginTop:'4rem',

    },
    ServiceCard:
    {
        position:'relative',
        borderRadius:'2px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        boxShadow:'0 70px 40px -35px rgba(200, 200, 200, 0.12)',
        transition:'transform 0.5s',
        '&:hover':{
            transform:'translate(0, -3px)',
            backgroundColor:'#f2f2f2',
            boxShadow:'0 70px 40px -35px rgba(85, 85, 85, 0.12)',
        },
        animation: "$grow 0.6s 1"        
    },
    "@keyframes grow": {
        from: { opacity:0 },
        to: {  opacity:1 }
      }
    ,
    Header:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        flexWrap:'nowrap'
    },
    Dots:
    {
        height:'2rem',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingLeft:'1.5rem',
        position:'relative'
    },
    Dot:
    {
        position:'relative',
        width:'1rem',
        height:'1rem', 
        borderRadius:'50%',
        backgroundColor:'#f8f8f8',
        margin:'0 0.5rem 0px 0.5rem',
        alignSelf:'center',
        display:'flex'

    },
    Control:{
        position:'relative',
        paddingRight:'1rem',
    },
    ListAction:{
        position:'absolute',
        right:'0',
        width:'150px',
        zIndex:'1',
        backgroundColor:"#c8c8c8bf",
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
    Image:{
        paddingTop:'100%',
        borderRadius:'2px',
        opacity:'1',
        transition:'opacity 0.6s',
        animation: "$GrowImage 0.6s 1" 
        
    },
    "@keyframes GrowImage": {
        from: { opacity:0 },
        to: { opacity:1 }
    }
    ,
    Media:{
        position:'relative',
        borderRadius:'2px',
        margin:'1rem 2rem',
        '&:hover':{
            '& .Image':{
                opacity:'0.7',
            },
            '& .btnDetail':
            {
                opacity:'1'
            }
        }
        
    },
    ButtonLabel:
    {
        margin: '0',
    },
    btnDetail:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
        opacity:'0',
        transition:'opacity 0.6s',
        cursor:'pointer'
    },
    Content:{
        
        position:'relative',
        display:'flex',
        margin:'0rem 1.5rem 1rem 1.5rem',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignContent:'center'
    },
    Name:
    {
        fontSize:'18px',
        fontFamily:'"Raleway", sans-serif',
        textAlign:'left',
       
    },
    Price:
    {
       position:'relative',
        fontSize:'15px',
        fontWeight:'700',
        color:'#dc0505'
    }
}   
))
export default useStyles