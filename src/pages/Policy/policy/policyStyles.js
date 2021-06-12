import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme=>(
{
    TableContainer:{
        borderRadius:'5px',
        border:'1px'
    },
    TableHeader:{
        "& .MuiTableCell-root":{
            fontSize:'18px', 
            fontWeight:'700',

        }
    },
    TableBody:{
        "& .MuiTableCell-root":{
            fontSize:'16px', 
            fontWeight:'500',
            padding:'0 16px 0 16px'
        }
    },
    TableFooter:{
        fontSize:'25px',
        "& *":{
            fontSize:'14px'
        },
        "& .MuiIconButton-label":{
            marginLeft:'0px'
        }
    },
    BodyRow:{
        "& .MuiTableCell-root":{
            padding:'16px'
        },
        "&:hover":{
            backgroundColor:'#fcfcfc'
        }
    },
    rowEditing:{
        backgroundColor:'#f8f8f8',
        "&:hover":{
            backgroundColor:'#f8f8f8'
        }
    },
    inputText: {
        textAlign:'center',
        "& .MuiInputBase-input":{
            textAlign:'center',
            fontSize:'15px',
            color:'#000000',
            padding:'0'
        }
    },
    InputCell:{
        borderTop:"1px solid rgba(224, 224, 224, 1)",
        paddingRight:'10px'
    },
    StatusCell:{
        justifyContent:'center',
        alignContent:'center',
        textAlign:'center',
        "& span":{
            marginLeft:'0',
        },
        "&.MuiTableCell-root":{
            padding:'0px'
        } 
       
    },
    switch:{
        "& span":{
            marginLeft:'0'
        },
       
    },
    ControlCell:{
        "&.MuiTableCell-root":{
            padding:0
        },
        minWidth:'88px'  
    },
    divControl:{
        display:"flex",
        justifyContent:'space-around',
    },
    ButtonLabel:
    {
        margin: '0'
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
    Snackbar:{
        '& .MuiAlert-message':{
            fontSize:'1.5rem'
        },
        "& span":{
            marginLeft:'0'
        },
        zIndex:'2'
    }
}
))

export default useStyles