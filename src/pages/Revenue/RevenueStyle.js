
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>(
{
    Revenuepage:{
        width:'100%',
        height:'100vh',
        paddingTop:'80px'
    },
    RevenueTextContent:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignContent:'center',
        padding:'0px',
        flexWrap:'wrap'
    },
   
    TextPanel:{
        padding:'0rem 2rem',
        marginTop:'2rem',
        minWidth:'250px',
        [theme.breakpoints.down('xs')]: {
            padding:'0rem 1rem',
            marginTop:'1rem',
        },
        
    },
    PanelContent:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        borderRadius:'5px',
        padding:'1rem 0rem',
        boxShadow:'0 5px 10px 0px rgba(60, 60, 60, 0.3)',
        [theme.breakpoints.down('xs')]: {
            padding:'1rem 2rem',
            flexDirection:'row',
            justifyContent:'flex-start',
        },
        
    
    },
    ValueLabel:{
        position:'relative',
        width:'min-content',
        whiteSpace: 'nowrap',
        alignSelf:'center',
        textAlign:'center',
        fontSize:'25px',
        fontWeight:'500',
        color:'#666666',
        marginRight:'1rem',
        [theme.breakpoints.down('xs')]: {
            fontSize:'20px',
        },
        "&:after":{
            content:"':'",
            position:'absolute',
            right:'0',
            bottom:'50%',
            transform:'translate(100%, 50%)',   
            with:'10px',
            height:'30px',
            visibility:'hidden',
            [theme.breakpoints.down('xs')]: {
                visibility:'visible',
            },
        }
       
    },
    TextValue:{
        textAlign:'center',
        fontSize:'25px',
        fontWeight:'500',
        color:'#666666',
        [theme.breakpoints.down('xs')]: {
            fontSize:'20px',
        },
    },
    toolbar:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'space-around',
        position:'relative',
        backgroundColor:'#fff',
        padding:"2rem 0rem" ,
        borderRadius:'10px',
        boxShadow:'0 5px 10px 0px rgba(60, 60, 60, 0.3)',
        margin:'2rem',
        [theme.breakpoints.down('xs')]: {
            padding:"1rem 0rem" ,
            margin:'1rem',
        },

    },
    ButtonIcon:{
        marginLeft:'0'
    },
    MonthYearBox:{
        position:'relatice',
        display:'flex',
        flexDirection:'row',
        flexWrap:'no-wrap'
    },
    txtMonth:{
        position:'relative',
        fontSize:'25px',
        '&:first-letter':{
            textTransform:'capitalize'
        },
        cursor:"pointer",
        color:"#666666",
        [theme.breakpoints.down('xs')]: {
            fontSize:'20px',
        },
    },
    txtYear:{
        marginLeft:'20px',
        position:'relative',
        fontSize:'25px',
        padding:"0px 20px",
        cursor:"pointer",
        color:"#666666",
        [theme.breakpoints.down('xs')]: {
            fontSize:'20px',
        },
    },
    MonthSelector:{
       
    },
    monthsContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        width:'250px',
        
        // backgroundColor:'#000'
    },
    SelectGirdItem:{
        display:'flex',
        border:'1px solid #fff',
        borderRadius:"5px",
        "&:hover":{
            backgroundColor:'#f8f8f8',
            border:"1px solid #000",
          
            color:'#dc3545'
        },
        alignContent:'center',
        justifyContent:'center',
        padding:"3px 0px",
        margin:"3px 0px",
        cursor:'pointer',
    },
    SelectItem:{
        fontSize:'12px',
        fontWeight:'500',
        textAlign:'center',
        '&:first-letter':{
            textTransform:'capitalize'
        },
    },
    CurrentItem:{
        backgroundColor:"#bbb",
        color:'#fff',
    },
    YearSelector:{
    },
    yearsContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        width:'250px',
    },
    GridSelector:{
        position:'absolute',
        right:'50%',
        bottom:"0",
        transform:'translate(50%, 100%)',
        backgroundColor:"#fff",
        zIndex:'1'

    },
    toolbarTitle:{
        fontSize:'25px',
        fontWeight:'600',
        color:"#666666",
        [theme.breakpoints.down('xs')]: {
            fontSize:'20px',
        },
    },
    ToolbarButton:{
        fontSize:'25px',
        textTransform:'capitalize',
        "& span":{
            marginLeft:'0px'
        },
        backgroundColor:"#e12828de",
        padding:'0 2rem',
        color:'#fff',
        border:"1px solid #c82323de",
        boxShadow:'0 5px 10px 0px rgba(60, 60, 60, 0.3)',
        '&:hover':{
            backgroundColor:"#e12828de",
            color:'#fff',
            opacity:'0.8'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:'20px',
        },
    },
    ChartPanel:{
        paddingTop:'2rem'
    },
    Tabs:{
        "& .MuiTabs-indicator":{
            marginLeft:'0'
        },
        "& .MuiTabs-flexContainer":{
            display:'flex',
            flexDirection:'row',
            flexWrap:'nowrap',
            justifyContent:'center',
            alignContent:'center'
        }
         
    },
    Tab:{
        fontSize:'14px',
        fontWeight:'600',
        "& span":{
            marginLeft:0
        }
    },
    MainContent:{
        marginTop:'6rem',
        boxShadow:'0 5px 10px 0px rgba(60, 60, 60, 0.3)',
    },
    LobbyChart:{
        marginTop:'4rem',
        boxShadow:'0 5px 10px 0px rgba(60, 60, 60, 0.3)',
    },
    LobbyChartLable:{
        color: '#444',
        fontSize:'23px',
        textAlign:'center',
        fontWeight:'800'
    },
    Food_Service_Report:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignContent:'center',
        padding:'0',
        paddingTop:'4rem'
    },
    ChartContent:{
        minHeight:'500px',
        margin:'3rem 0rem',
        padding:'2rem',
        
    },
    ReportPanel:{
       
        boxShadow:'0 5px 10px 0px rgba(60, 60, 60, 0.3)',
    },
    Food_report:{
        paddingLeft:'2rem'
    },
    Service_report:{
        paddingRight:'2rem'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 999,
        color: '#fff',
    },
}   
))
export default useStyles