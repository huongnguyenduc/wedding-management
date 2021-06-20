import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>(
{
    
    backdrop: {
        zIndex: theme.zIndex.drawer + 999,
        color: '#fff',
    },
    buttonArea:
    {
        position:'fixed',
        bottom:'0',
        right:'15px',
        width:'120px',
        height:'120px',
        "background-image":'transparent',
        opacity:'0.5',
        transition:'opacity 10s', 
        '&:after':
        {
            position: "absolute",
            content: '""',
            right:'0',
            bottom:'0',
            width:'30px',
            height:'30px',
            borderRadius:'1000px 0 0 0',
            backgroundColor:'rgba(0,0,0,0.1)',
        },
        '&:hover':
        {
            borderRadius:'100% 0 0 0',
            width:'200px',
            height:'150px',
            opacity:'1',
            "background-image": "linear-gradient(to top left, #dcdde1 , #fff)"
        },
        '&:hover .insertFab':{
            visibility:'visible',
            backgroundColor:'#273c75',
            opacity:'1',
            
            
        },
        '&:hover .categoryFab':
        {
            visibility:'visible',
            backgroundColor:'#273c75',
            opacity:'1'
        }
       
    },
    InsertFab: {
        position: 'fixed',
        bottom: theme.spacing(12),
        right: theme.spacing(4),
        opacity:'0',
        visibility:'hidden',
        transition:'opacity 0.8s',
        
    },
    MenuFab:{
        position: 'fixed',
        visibility:'hidden',
        opacity:'0',
        bottom: theme.spacing(2),
        right: theme.spacing(11),
        transition:'opacity 0.8s',
    },
    ButtonLabel:
    {
        margin: '0'
    },
    CategoryTable:
    {
        width:'100%'
    },
    TableHead:
    {
        width:'100%'
    },
    inputDisabled:
    {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "#000",
        }
    },
    CellInfo:
    {
        flexDirection:'row',
        justifyContent:'space-around',
    },
    Alert:
    {
        "& label":{
            margin: '0 !important'
        }
        
    },  
   
}
))

export default useStyles