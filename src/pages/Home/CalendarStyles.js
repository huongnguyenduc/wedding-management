import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme=>(
{
    CalendarPage:{
        position:'fixed',
        bottom:0,
        right:0,
        width:'100%',
        height:"calc(100% - 80px)",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#eeeeee',
        overflow:'auto',
        "&::-webkit-scrollbar": {
            display: 'none'
        },
        animation:"$CalendarAnimation 0.2s ease-out forwards"
    },
    CalendarPaper:{
        maxWidth:'90%',
        border:'1px solid #ddd',
        borderRadius:'10px',
        padding:'0',
        alignSelf:'center',
        boxShadow:'0 1px 4px 0 rgb(0, 0, 0, 0.14)',
        "&::-webkit-scrollbar": {
            display: 'none'
        },
       
    },
    "@keyframes CalendarAnimation":{
        from:{
            opacity:'0',
            transform:'scale(0.5)'
        },
        to:{
           opacity:'1',
           transform:'scale(1)'
        }
    },
    toolbar:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'no-wrap',
        justifyContent:'space-around',
        position:'relative',
        backgroundColor:'#fff'
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
    },
    txtYear:{
        marginLeft:'20px',
        position:'relative',
        fontSize:'25px',
        padding:"0px 20px",
        cursor:"pointer",
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
        padding:'1rem',
        zIndex:'1'

    },
    leftControlButton:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'space-between',
    },
    ToolbarButonIcon:{
        fontSize:"20px"
    },
    btnGoToDay:{
        fontSize:'15px',
        fontWeight:'500',
        marginLeft:'2rem'
    },
    calendarHeader:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        width:'100%'
    },
    headCell:{
        position:'relative',
        width:"calc(100% / 7)",
        borderBottom:"1px solid #ddd",
        borderLeft:'1px solid #fff',
        borderRight:'1px solid #fff',
        fontSize:'15px',
        fontWeight:'700',
        textAlign:'right',
        padding:'16px 10px 2px 16px',
        '&:first-letter':{
            textTransform:'capitalize'
        },
        color:'#999999',
        backgroundColor:'#fff'
    },
    tableRow:{
        position:'relative',
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        width:'100%',
        height:'10rem',

    },
    tableCell:{
        position:'relative',
        width:'calc(100% / 7)',
        padding:'0',
        height:'100%',
        border:'1px solid #ddd',
        display:'flex',
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'flex-start',
        backgroundColor:'#fff'
    },
    cellCurrentDay:{
        position:'relative',
        width:'calc(100% / 7)',
        height:'100%',
        padding:'0',
        border:'1px solid #e1f5fe',
        display:'flex',
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'flex-start',
        backgroundColor:'#e1f5fe'
    },
    txtDate:{
        fontSize:'15px',
        textAlign:'right',
        position:'absolute',
        top:0,
        right:0,
        paddingTop:'2px',
        marginRight:'8px',
        color:"#000000de",
        cursor:"pointer",
        "&:hover":{
            color:"#9b7552"
        },
        zIndex:'2',
    },
    txtCurrentDay:{
        textAlign:'right',
        position:'absolute',
        top:0,
        right:0,
        paddingTop:'2px',
        marginRight:'8px',
        fontSize:"15px",
        color:"#000",
        fontWeight:'700',
        zIndex:'2',
        cursor:"pointer",
        "&:hover":{
            color:'#9c01b7'
        }
    },
    txtDateLastMonth:{
        fontSize:'15px',
        textAlign:'right',
        position:'absolute',
        top:0,
        right:0,
        paddingTop:'2px',
        marginRight:'8px',
        color:"#bbb8b8",
        cursor:"pointer",
        "&:hover":{
            color:"#9b7552"
        },
        zIndex:'2',
    },
    CellContent:{
        display:"flex",
        flexDirection:'column',
        overflowY:'auto',
        "&::-webkit-scrollbar": {
            display: 'none'
        },
        backgroundColor:'transparent',
        width:'100%',
        height:"100%",
        padding:'0px 8px 5px 8px',
        marginTop:'25px'

    },
    GridFeastInfo:{
        width:'100%',
        minHeight:'15px',
        height:'15px',
        marginBottom:'3px',
        backgroundColor:"#4caf50",
        borderRadius:'2px',
        cursor:"pointer",
        fontSize:'11px',
        fontWeight:'500',
        overflow: 'hidden',
        padding:'0px 3px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color:'#fff',
        textAlign:'left',
        boxShadow:'0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px hsl(0deg 0% 60% / 40%)'

    },
    txtFeastName:{
    },
    NoteContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'space-around',
        marginTop:'1rem'
    },
    TfNote:{
        position:'relative',
        fontSize:"15px",
        fontWeight:'500',
        paddingRight:"10px",
        "&:before":{
            content:'""',
            position:'absolute',
            top:'50%',
            right:0,
            width:'15px',
            height:'15px',
            transform:'translate(100%, -50%)',
            backgroundColor:'#000',
        }
    },
    BlueNote:{
        "&:before":{
            backgroundColor:'#00bcd4'
        }
    },
    RedNote:{
        "&:before":{
            backgroundColor:'#f44336'
        }
    },
    YelowNote:{
        "&:before":{
            backgroundColor:'#fe9700'
        }
    },
    GreenNote:{
        "&:before":{
            backgroundColor:'#4caf50'
        }
    },
    
    DetaiContainer:{
        position:'absolute',
        top:'50%',
        right:'50%',
        transform:'translate(50%, 0%)',
        zIndex:'3',
        backgroundColor:'#f8f8f8',
        width:'300px',
        height:"200px",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        borderRadius:"10px",
        animation:"$DetailAnimation 0.2s ease-out"
    },

    "@keyframes DetailAnimation":{
        from:{
            opacity:'0',
            transform:'scale(0) translate(50%, 0%)'
        },
        to:{
           opacity:'1',
           transform:'scale(1) translate(50%, 0%)'
        }
    },
    MainDetailtContent:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
    },
    SubDetailContent:{
        marginTop:'1rem'
    },
    txtDetailName:{
        textAlign:'center',
        fontSize:"25px",
        fontWeight:'500',
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        alignContent:'center',
        justifyContent:'center',
        color:'#757575'

    },
    MainTextIcon:{
        fontSize:'25px',
        marginRight:'1rem'
    },
    DetailNameIcon:{
        fontSize:'30px',
        alignSelf:'center',
        color:"#e62e20"
    },
    txtSubText:{
        textAlign:'center',
        fontSize:"18px",
        fontWeight:'500',
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        alignContent:'center',
        justifyContent:'center',
    },
    SubTextIcon:{
        fontSize:'20px',
        marginRight:'1rem',
        transform:'translate(0,2px)'
    }
   
}   
))

export default useStyles