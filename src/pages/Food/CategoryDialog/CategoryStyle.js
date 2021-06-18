import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme=>(
{
    inputText: {
        textAlign:'center',
        "& .MuiInputBase-input":{
            textAlign:'center',
            fontSize:'15px',
            color:'#000000',
            padding:'0'
        }
    },
    ButtonLabel:
    {
        margin: '0'
    },
    CellControl:
    {
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    
    

}
))

export default useStyles