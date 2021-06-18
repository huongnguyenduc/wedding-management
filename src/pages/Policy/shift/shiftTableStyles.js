import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme=>({
    shiftTable:{
        border:'1px solid #000',
        borderRadius:'20px',
        overflow:'hidden',
        marginTop:'2rem',
        boxShadow:'0 100px 40px -35px rgba(120, 120, 120, 0.1)',
    },
    TableHeader:{
        backgroundColor:'#eeeeee',
        "& .MuiTableCell-root":{
            fontSize:'18px', 
            fontWeight:'700',
            textTransform:'uppercase'
        },
        [theme.breakpoints.down('xs')]: {
            "& .MuiTableCell-root":{
                fontSize:'15px', 
                fontWeight:'700',
                textTransform:'uppercase'
            },
        },
    },
    TableBody:{
        "& .MuiTableCell-root":{
            fontSize:'18px',
            fontWeight:'500',

        }
    },
    BodyRow:{
        "&:hover":{
            backgroundColor:'#fcfcfc'
        }
    },
    Toolbar:{
        backgroundColor:'#eeeeee',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    ToolbarTitle:{
        fontSize:'30px',
        fontWeight:700
    },
    InfoCell:{
        fontSize:'18px'
    }, 
    SearchBox:{
        width:'60%',
        display:'flex',
        flexDirection:'row',
        [theme.breakpoints.down('xs')]: {
            width:'80%',
        },
    },
    ToolbarFilter:{
       
        "& .MuiInputBase-root":{
            fontSize:'18px',
            padding:'0px 10px 0px 10px'
        },
        "& .MuiOutlinedInput-input":{
            padding:'5px 10px 5px 10px'
        },
        marginRight:'1rem'
        
    },
    Button:{
        padding:'0 5px',
        [theme.breakpoints.down('xs')]: {
            display:'none'
        },
    }, 
    Snackbar:{
        '& .MuiAlert-message':{
            fontSize:'1.5rem'
        },
         "& span":{
            marginLeft:'0'
        },
        zIndex:'2'
    },
    inputText:{
        textAlign:'center',
        "& .MuiInputBase-input":{
            textAlign:'center',
            fontSize:'15px',
            color:'#000000',
            padding:'0'
        }
    },
    ControlCell:{
        padding:"8px"
    },
    divControl:{
        display:"flex",
        justifyContent:"space-around"
    },
    ButtonLabel:{
        marginLeft:'0',
    },
    Icon:{
        fontSize:'22px'
    },
    rowEditing:{
        backgroundColor:'#f8f8f8',
        borderTop:'solid 2px #e0e0e0',
        borderBottom:'solid 2px #e0e0e0'
    },
    TableFooter:{
        "& *":{
            fontSize:'14px'
        },
        "& .MuiIconButton-label":{
            marginLeft:'0px'
        },
    },
}))

export default useStyles
