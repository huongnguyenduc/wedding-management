import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme=>(
{
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    policyTable:{
        border:'1px solid #000',
        borderRadius:'20px',
        overflow:'hidden',
        display:'flex',
        flexDirection:'column',
        boxShadow:'0 50px 40px -35px rgba(120, 120, 120, 0.1)',
    },
    PolicyPanel:{
       
    },
    Toolbar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        backgroundColor:'#eeeeee',
    },
    ToolbarTitle:{
        fontSize:'30px',
        fontWeight:700
    },
    TableHeader:{
        backgroundColor:'#eeeeee',
        "& .MuiTableCell-root":{
            fontSize:'18px', 
            fontWeight:'700',

        }
    },
    PolicyContent:{
        display:'flex',
        flexDirection:'row',
    },
    BodyRow:{
        align:'center'
    },
    NameContent:{
        fontSize:'18px',
        fontWeight:'500',
        textAlign:'center'
    },
    PercentContent:{
        "& input::-webkit-outer-spin-button":{
            "-webkit-appearance": 'none',
            margin: 0
        },
        "& input::-webkit-inner-spin-button": {
          "-webkit-appearance": 'none',
            margin: 0
        },
        border:'0',
        fontSize:'18px',
        width:"100px",
        minWidth:'100px',
        "& input":{
            textAlign:'center',
        },  
    },
    Button:{
        padding:0,
        borderRadius:0
    },
    ButtonLabel:{
        margin:0
    },
    ButtonIcon:{
        fontSize:"18px"
    },
    ButtonDoneIcon:{
        fontSize:'25px'
    },
    ControlCell:{
        padding:'0'
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