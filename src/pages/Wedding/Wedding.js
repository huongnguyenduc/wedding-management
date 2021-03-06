import React, { useEffect } from 'react'
import { Typography, Container, Grid, MuiThemeProvider } from '@material-ui/core';
import useStyles from './styles';
import theme from '../../components/MuiTheme';
import { connect } from 'react-redux'
import EnhancedTable from './WeddingDataTable';
import WeddingForm from './WeddingForm';
import {actFetchWeddingsRequest} from './../../action/index';
import {actFetchShiftsRequest} from './../../action/shift';
import {actFetchLobbiesRequest} from './../../action/lobby';
import {actFetchPaidBillsRequest} from './../../action/paidBill';
function Wedding(props) {
    const classes = useStyles();
    useEffect(()=>{
        props.fetchAllWeddingsInfo();
        props.fetchAllPaidBills();
    })

    return (
        <>
        <MuiThemeProvider theme={theme}>
            <Grid container spacing={3} justify='center' direction='column' className={classes.page}>
                <Grid item xs={12}>
                    <Typography id="weddingTitle" variant="h4" align='center' className={classes.title}>Quản lý tiệc cưới</Typography>
                </Grid>
                <Grid item xs={12} id='formWedding'>
                    <Container maxWidth='lg' className={classes.formWedding} >
                        <Container className={classes.formWeddingTitle}>    
                            <Typography variant="subtitle" align='center'>Thông tin đặt tiệc</Typography>
                        </Container>
                        <WeddingForm />                            
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth='lg' className={classes.listFormWedding}>
                        <EnhancedTable />
                    </Container>
                </Grid>
            </Grid>
            </MuiThemeProvider>  
        </>
    )
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllWeddingsInfo : () => {
            dispatch(actFetchWeddingsRequest());
            dispatch(actFetchShiftsRequest());
            dispatch(actFetchLobbiesRequest());
        },
        fetchAllPaidBills : () => {
            dispatch(actFetchPaidBillsRequest());
        },
    }
}

export default connect(null, mapDispatchToProps)(Wedding);
