import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme=>({
    TableHeader:{
        "& .MuiTableCell-root":{
            fontSize:'18px', 
            fontWeight:'700',

        }
    },
    TableBody:{
        "& .MuiTableCell-root":{
            fontSize:'15px', 
            fontWeight:'500',

        }
    },
    CellControl:{
       "&.MuiTableCell-root":{
           padding:0
       }

    },
    divControl:{
        display:'flex',
        justifyContent:'space-around',
    },
    BodyRow:{
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
    RowEditing:{
        border:'2px solid rgba(250,250,250,1)',
        backgroundColor:'rgba(250,250,250,1)'
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
    inputText:
    {
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
    Snackbar:{
        '& .MuiAlert-message':{
            fontSize:'1.5rem'
        },
         "& span":{
            marginLeft:'0'
        },
        zIndex:'2'
    }
}))

export default useStyles