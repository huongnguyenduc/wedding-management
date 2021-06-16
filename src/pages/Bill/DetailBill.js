import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, Typography, Grid, CircularProgress, IconButton } from '@material-ui/core/';
import BillInfo from './components/BillInfo';
import ServiceTable from './components/ServiceTable';
import theme from '../../components/MuiTheme';
import TableList from './components/TableList';
import Payment from './components/Payment';
import Management from './components/Management';
import {actGetNotPaidBillRequest} from './../../action/notPaidBill';
import {actFetchWeddingServicesRequest} from './../../action/weddingService';
import {actFetchTablesRequest} from './../../action/table';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import { lightBlue } from '@material-ui/core/colors'; 
import {ArrowBack, } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    title: {
        justifyContent: "center",
        margin: "20px 0px",
        display: "flex"
    },
    tables: {
        marginLeft: "-50px"
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
    backButton: {
        position: 'absolute',
        top: '90px',
        left: "10px",
        display: "flex",
        flexDirection: "row"
    },
    arrow: {
        marginRight: "5px"
    }
}));

function DetailBill(props) {
    const classes = useStyles();
    useEffect(() => {
        props.getNotPaidBill(props.match.params.weddingId);
        props.fetchWeddingServices(props.match.params.weddingId);
        props.fetchAllTable(props.match.params.weddingId);
    }, [])
    return (
        <>
        {props.notPaidBillItem.feast && props.weddingServices.services && props.tables.feastTables ? 
            <MuiThemeProvider theme={theme}>
                <Link to="/bill">
                    <IconButton
                    edge="start"
                    className={classes.backButton}
                    >
                            <ArrowBack style={{ color: lightBlue[900] }} className={classes.arrow}/>
                            <Typography variant="h6" style={{ color: lightBlue[900] }}>Quay lại</Typography>
                    </IconButton>     
                </Link>
                <div className={classes.title}>     
                    <Typography variant="h4">HÓA ĐƠN THANH TOÁN</Typography>
                </div>
                <Grid container spacing={2} className={classes.tables}>
                    <Grid item xs={12}>
                        <BillInfo feast={props.notPaidBillItem.feast} totalTablePrice={props.notPaidBillItem.totalTablePrice} />         
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <ServiceTable rows={props.weddingServices.services} />         
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TableList rows={props.tables.feastTables} />         
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12} justifyContent="center">
                        <Payment bill={props.notPaidBillItem} />         
                    </Grid>
                    <Grid item md={6} xs={12}  justifyContent="center" alignContent="center">
                        <Management bill={props.notPaidBillItem} />         
                    </Grid>
                </Grid>
            </MuiThemeProvider> : 
            <div className={classes.loadingPage}>
                <CircularProgress className={classes.loading} />
            </div> }
        </>
    )
}

const mapStateToProps = state => {
    return {
        notPaidBillItem: state.notPaidBillItem,
        weddingServices: state.weddingServices,
        tables: state.tables
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getNotPaidBill : (id) => {
            dispatch(actGetNotPaidBillRequest(id));
        },
        fetchWeddingServices : (id) => {
            dispatch(actFetchWeddingServicesRequest(id));
        },
        fetchAllTable : (idWedding) => {
            dispatch(actFetchTablesRequest(idWedding));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBill);
