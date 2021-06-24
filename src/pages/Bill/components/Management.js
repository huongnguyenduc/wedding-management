import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, Grid, Container, Button} from '@material-ui/core/';
import {Link} from 'react-router-dom';
import {actUpdateNotPaidBillRequest} from './../../../action/notPaidBill';
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack';
import { getCookie } from '../../../action/Login'
import BillPrint from './BillPrint'

const useStyles = makeStyles((theme) => ({
    billInfo: {
        padding: theme.spacing(2),
        margin: '0px 40px',
        borderRadius: 20
    },
    billInfoBorder: {
        border: "2px solid black",
        borderRadius: "10px",
    },
    billInfoTitle: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '910px',
        left: "850px",
        width: '110px',
        justifyContent: 'center'
    },
    billInfoContainer: {
        margin: '20px 0px 20px -10px',
        padding: '0px 15px' 
    },
    billInfoItem: {
        justifySelf: "center"
    },
    billInfoItemTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexGrow: 2,
    },
    billInfoValueItem: {
        border: "1px solid black",
        padding: "10px",
        borderRadius: "10px",
        width: "100%",
        flexGrow: 3,
    },
}));

function Management(props) {
    const classes = useStyles();
    const {dateOfPayment, status, feast} = props.bill;
    const [isSaved, setIsSaved] = React.useState((status===1));
    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = () => {
        props.saveBill(feast.id, savedBillSuccess, savedBillFailure);

    };
    const savedBillSuccess = () => {
        enqueueSnackbar("Lưu hóa đơn thành công!", { variant: "success", autoHideDuration: 3000 });
        setIsSaved(true);
    }
    const savedBillFailure = () => {
        enqueueSnackbar("Lỗi hệ thống. Lưu hóa đơn thất bại!", { variant: "error", autoHideDuration: 3000 });
    }
    const fullname=getCookie("fullname")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(false);
    console.log(props.bill)
    return (
        <>
            <Paper elevation={3} className={classes.billInfo}>
                <div className={classes.billInfoBorder}>
                    <Container className={classes.billInfoTitle} >    
                            <Typography variant="subtitle" align='center'>Quản lý</Typography>
                    </Container>    
                    <Grid container spacing ={2} className={classes.billInfoContainer} justify="center">
                        <Grid item xs={12}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1" className={classes.billInfoItemTitle}>Người lập hóa đơn</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <div className={classes.billInfoValueItem}>
                                        <Typography variant="subtitle1">{fullname}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1" className={classes.billInfoItemTitle}>Ngày lập hóa đơn</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <div className={classes.billInfoValueItem}>
                                        <Typography variant="subtitle1">{convertDateToStringDMY(dateOfPayment)}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} align="center">
                            <BillPrint open={open} handleClose={handleClose} bill={props.bill}/>
                            <Button variant="contained" color="primary" className={classes.billInfoItem} onClick={handleClickOpen}>
                                In hóa đơn
                            </Button>
                        </Grid>
                        <Grid item xs={4} align="center">
                                <Button variant="contained" color="primary" disabled={isSaved} onClick={handleClickVariant}>
                                    Lưu hóa đơn
                                </Button>
                        </Grid>
                        <Grid item xs={4} align="center">
                            <Link to="/bill">
                                <Button variant="contained" color="primary">
                                    Trở về
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </>
    )
}


function convertDateToStringDMY(date) {
    if (date == null) return;
        let day = date.substring(8, 10);
        let month = date.substring(5, 7);
        let year = date.substring(0, 4);
        let result = day + "/" + month + "/" +  year;
        return result;
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        saveBill : (id, savedBillSuccess, savedBillFailure) => {
            dispatch(actUpdateNotPaidBillRequest(id, savedBillSuccess, savedBillFailure));
        },
    }
}

export default connect(null, mapDispatchToProps)(Management);
