import React, { useEffect } from 'react'
import { Typography, Container, Grid, MuiThemeProvider } from '@material-ui/core';
import useStyles from './styles';
import theme from './MuiTheme';
import { connect } from 'react-redux'
import EnhancedTable from './WeddingDataTable';
import WeddingForm from './WeddingForm';
import {actFetchWeddingsRequest} from './../../action/index';
import {actFetchShiftsRequest} from './../../action/shift';
import {actFetchLobbiesRequest} from './../../action/lobby';

function Wedding(props) {
    const classes = useStyles();
    useEffect(()=>{
        props.fetchAllWeddingsInfo();
    })

    return (
        <>
        <MuiThemeProvider theme={theme}>
            <Grid container spacing={3} justify='center' direction='column'>
                <Grid item xs={12}>
                    <Typography variant="h4" align='center' className={classes.title}>Quản lý tiệc cưới</Typography>
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
    }
}

export default connect(null, mapDispatchToProps)(Wedding);
