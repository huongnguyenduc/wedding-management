import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme=>(
{

    
    FoodContainer: {
        margin: '0',
        display:'flex',
        flexDirection:'row',
        // backgroundColor:'#121618'
    },
    MediaContainer:
    { 
        width:'50%',
        minWidth:'600px',
        position:'relative',
        '&:hover .BtnImg':{
            opacity:1,
            
        },
        '&:hover .Media':
        {
            opacity: 0.9,            
        },
        '@media (max-width: 1280px)' : {
            minWidth:'420px'
         },
        '@media (max-width: 960px)' : {
           minWidth:'300px'
          
        },
        '@media (max-width: 680px)' : {
            minWidth:'100%'
         },
    },
    BtnImg:
    {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity:0,
        cursor: "pointer" ,
        backfaceVisibility:'hidden',      
    },
    Media:
    { 
        paddingTop: '100%',
        opacity:1,
        transition: "0.8s ease",
        '@media (max-width: 680px)' : {
            paddingTop: '56.25%',
         },
         position:'relative'
    },
    InfoContainer:
    {
        width:'45%',
        padding:'1rem',
        position:'relative',
        display:'flex',
        flexDirection:'column',
        minWidth:'600px',
        '@media (max-width: 1280px)' : {
            minWidth:'420px'
        },
        '@media (max-width: 960px)' : {
            minWidth:'50%'
        },
        '@media (max-width: 680px)' : {
            minWidth:'100%',
        },
    },
    GrdName:
    {
        width:'100%'
    },
    tfName:
    {
        fontSize:'40px',
        letterSpacing:'4px',
        fontWeight:700,
        color:'#3d3d3d', 
        fontFamily: '"Patrick Hand", cursive',
        "&.MuiInputBase-root.Mui-disabled": {
            color: '#3d3d3d',
        }
    },
    tfPrice:
    {
        fontSize: '32px',
        lineHeight:'32px',
        fontWeight:'700',
        color: '#ff9f1a',
        fontFamily:'"Patrick Hand", cursive',
        "&.MuiInputBase-root.Mui-disabled": {
            color: '#ff9f1a',
        }
    },
    tfCategory:
    {
        fontSize: '25px',
        color:'#4b4b4b',
        fontFamily:'"Patrick Hand", cursive',
        padding:'0',
        "&:before":
        {
            borderBottom:'0'
        },
        '& .MuiInputBase-input':
        {
            padding:'0 20px 0 0'
        },
        "&.MuiInputBase-root.Mui-disabled": {
            color: '#4b4b4b',
        }
    },
    tfMoreInfo:
    {
        fontSize: '22px',
        color:'#4b4b4b',
        fontFamily:'"Patrick Hand", cursive',
        marginBottom:'50px',
        "&.MuiInputBase-root.Mui-disabled": {
            color: '#4b4b4b',
        }
        
    },
    ButtonLabel:
    {
        margin: '0 !important'
    },
    button:
    {
        minWidth:'120px',
        fontSize: '18px',
        fontWeight:'700'
       
        // fontFamily:'"Patrick Hand", cursive',

    },
    btnDelete:
    {
        color:'#EA2027',
        opacity:'0.9',
        transition:"opacity 0.5s ease",
        '&:hover':
        {
            color:'#EA2027',
            opacity:1
        }
    },
    btnEdit:
    {
        color:'#3f51b5',
        opacity:'0.9',
        transition:"opacity 0.5s ease",
        '&:hover':
        {
            color:'#3f51b5',
            opacity:1
        }
    },
    btnDone:
    {
        color:'#EA2027',
        opacity:'0.9',
        transition:"opacity 0.5s ease",
        '&:hover':
        {
            color:'#EA2027',
            opacity:1
        }
    },
    btnCancel:
    {
        color:'#3f51b5',
        opacity:'0.9',
        transition:"opacity 0.5s ease",
        '&:hover':
        {
            color:'#3f51b5',
            opacity:1
        }
    },
    ControlContainer:
    {
        width:'calc(100% - 20px)',
        display:'flex',
        justifyContent:'center',
        position:'absolute',
        bottom:'3rem'
        
    },
    ControlGroup:
    {
        display:'flex',
        width:'100%',
        flexWrap:'nowrap',
        justifyContent:'space-around',

    },

}
))

export default useStyles