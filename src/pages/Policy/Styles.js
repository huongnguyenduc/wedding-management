import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles(theme=>(
{
    PolicyContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:"space-around",
        alignContent:'center',
        width:'100%',
        alignSelf:'center',
        boxShadow:'0 100px 60px -50px rgba(220, 220, 220, 0.35)',
        minHeight:'calc(100vh - 80px)',  
        padding:'5rem 0 10rem 0',
        backgroundColor:"",
        [theme.breakpoints.down('xs')]: {
            padding:'1rem 1rem',
        },
        marginTop:'80px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 999,
        color: '#fff',
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