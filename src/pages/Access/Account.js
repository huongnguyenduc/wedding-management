import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, Typography, CircularProgress  } from '@material-ui/core';
import theme from '../../components/MuiTheme';
import { connect } from 'react-redux'
import AccountList from './Components/AccountList';


const useStyles = makeStyles((theme) => ({
    title: {
        justifyContent: "center",
        marginTop: "10px",
        display: "flex"
    },
    select: {
        justifyContent: "center",
        marginTop: "10px",
        display: "flex"
    },
    loading: {
        alignSelf: "center"
    },
    loadingPage: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },
}));

function Account(props) {
    const classes = useStyles();
    useEffect(() => {
        // props.getNotPaidBill(props.match.params.weddingId);
        // props.fetchWeddingServices(props.match.params.weddingId);
        // props.fetchAllTable(props.match.params.weddingId);
    }, [])

    return (
        <>
        {props.data ? 
            <MuiThemeProvider theme={theme}>
                <div className={classes.title}>     
                    <Typography variant="h4">Quản Lý Tài Khoản</Typography>
                </div>
                <div className={classes.select}>     
                    <AccountList rows={props.data}/>
                </div>      
            </MuiThemeProvider> : 
            <div className={classes.loadingPage}>
                <CircularProgress className={classes.loading} />
            </div> }
        </>
    )
}

const mapStateToProps = state => {
    return {
        //notPaidBillItem: state.notPaidBillItem,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // getNotPaidBill : (id) => {
        //     dispatch(actGetNotPaidBillRequest(id));
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
