import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>(
{
    CategoryTable:{
        animation:"$First_animation 0.5s ease-out"
    },
    "@keyframes First_animation":{
        from:{
            opacity:'0',
            transform:'translate(0,40px)'
        },
        to:{
           opacity:'1',
           transform:'translate(0,0)'
        }
    },
    Toolbar: {
        paddingLeft: "3rem",
        paddingRight: "1rem",
      },
      ToolbarTitle: {
        flex: '1 100%',
        fontSize:'20px',
        fontWeight:'700'
    },
    ButtonLabel:
    {
        margin: '0'
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
    Snackbar:{
        '& .MuiAlert-message':{
            fontSize:'1.5rem'
        },
        "& span":{
            marginLeft:'0'
        },
        zIndex: theme.zIndex.drawer
    },
    
    
}
))

export default useStyles