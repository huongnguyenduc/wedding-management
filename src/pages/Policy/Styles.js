import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles(theme=>(
{
    PolicyContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:"center",
        marginTop:'2rem',
        width:'100%',
        alignSelf:'center',
        boxShadow:'0 100px 60px -50px rgba(220, 220, 220, 0.35)'  
    },
    Tabs:{
        display:'flex',
        justifyContent:'center',
        marginBottom:'2rem',
        "& .MuiTab-root":{
            fontSize:'18px',
            fontWeight:'700'
        },
        "& span":{
            marginLeft:'0px'
        },
        "& .MuiTabs-fixed":{
            display:'flex',
            justifyContent:'center'
        }
    }
}
))

export default useStyles