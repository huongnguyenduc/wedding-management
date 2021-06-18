import {makeStyles} from '@material-ui/core/styles'; 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    title: {
        marginTop: "2rem",
    },
    formWedding: {
        padding: "3rem",
        border: "1px solid black",
        borderRadius: "10px"
    },
    formWeddingTitle: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '155px',
        width: '160px',
        justifyContent: 'center'
    },
    textField: {
        width: 300,
    },
    formWeddingGridItem: {
        padding: "50px"
    },
    resize:{
        fontSize: 15,
    },
    listFormWedding: {
        
    },
    formControl: {
    
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))
export default useStyles;