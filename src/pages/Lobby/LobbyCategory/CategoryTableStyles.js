import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>(
{
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
        backgroundColor:'#f8f8f8'
    },
    TableFooter:{
        "& *":{
            fontSize:'14px'
        },
        "& .MuiIconButton-label":{
            marginLeft:'0px'
        },
    }
    
    
}
))

export default useStyles