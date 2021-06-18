import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, Grid, Container} from '@material-ui/core/';
import NumberFormat from 'react-number-format';
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
        left: "80px",
        width: '120px',
        justifyContent: 'center'
    },
    billInfoContainer: {
        margin: '20px 0px 20px -10px',
        padding: '0px 15px' 
    },
    billInfoItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
}));

function Payment(props) {
    const classes = useStyles();
    const {totalServicePrice, totalBill, totalFine, unpaidMoney, feast} = props.bill;
    return (
        <>
            <Paper elevation={3} className={classes.billInfo}>
                <div className={classes.billInfoBorder}>
                    <Container className={classes.billInfoTitle}>    
                            <Typography variant="subtitle" align='center'>Thanh toán</Typography>
                    </Container>
                    <Grid container spacing ={2} className={classes.billInfoContainer}>
                        <Grid item xs={12}>
                                <div className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">Tổng tiền dịch vụ:</Typography>
                                    <Typography variant="subtitle1">
                                        <NumberFormat value={totalServicePrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} />
                                    </Typography>
                                </div>
                        </Grid>
                        <Grid item xs={12}>
                                <div className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">Tổng tiền hóa đơn:</Typography>
                                    <Typography variant="subtitle1">
                                        <NumberFormat value={totalBill} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} />
                                    </Typography>
                                </div>
                        </Grid>
                        <Grid item xs={12}>
                                <div className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">Tổng tiền đặt cọc:</Typography>
                                    <Typography variant="subtitle1">
                                        <NumberFormat value={feast.deposit} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} />
                                    </Typography>
                                </div>
                        </Grid>
                        <Grid item xs={12}>
                                <div className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">Tổng tiền phạt:</Typography>
                                    <Typography variant="subtitle1">
                                        <NumberFormat value={totalFine} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} />
                                    </Typography>
                                </div>
                        </Grid>
                        <Grid item xs={12}>
                                <div className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">Còn lại:</Typography>
                                    <Typography variant="subtitle1">
                                        <NumberFormat value={unpaidMoney} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} />
                                    </Typography>
                                </div>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </>
    )
}


export default Payment;
