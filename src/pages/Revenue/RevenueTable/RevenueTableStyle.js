
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>(
{
    Toolbar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    TablePagination:{
        fontSize:'15px',
        "& *":{
            fontSize:'15px'
        }
    },
    BodyCell:{
        fontSize:'16px'
    },
    ToolbarTitle:{
        fontWeight:800,
         fontSize:'20px',
          color:"#454550",
          textAlign:'center'
    }
}   
))
export default useStyles