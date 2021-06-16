import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, Grid, Container} from '@material-ui/core/';
const useStyles = makeStyles((theme) => ({
    billInfo: {
        padding: theme.spacing(2),
        margin: '0px 100px',
        borderRadius: 20
    },
    billInfoBorder: {
        border: "2px solid black",
        borderRadius: "10px",
    },
    billInfoTitle: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '165px',
        left: "150px",
        width: '160px',
        justifyContent: 'center'
    },
    billInfoContainer: {
        margin: '20px 0px 20px -10px',
        padding: '0px 15px' 
    },
    billInfoItem: {
        border: "1px solid black",
        padding: "10px",
        borderRadius: "10px",
    },
}));

function BillInfo(props) {
    const classes = useStyles();
    const {groomname, bridename, phone, dateOfOrganization, number_of_table } = props.feast;
    const totalTablePrice = props.totalTablePrice;
    return (
        <>
            <Paper elevation={3} className={classes.billInfo}>
                <div className={classes.billInfoBorder}>
                    <Container className={classes.billInfoTitle}>    
                            <Typography variant="subtitle" align='center'>Thông tin hóa đơn</Typography>
                    </Container>
                    <Grid container spacing ={3} className={classes.billInfoContainer}>
                        <Grid item md={4} sm={6}xs={12}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1">Tên chú rể</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <div className={classes.billInfoItem}>
                                        <Typography variant="subtitle1">{groomname}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1">Tên cô dâu</Typography>
                                </Grid>
                                <Grid item xs={7} className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">{bridename}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1">Ngày đãi tiệc</Typography>
                                </Grid>
                                <Grid item xs={7} className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">{dateOfOrganization}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1">Số điện thoại</Typography>
                                </Grid>
                                <Grid item xs={7} className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">{phone}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1">Số lượng bàn</Typography>
                                </Grid>
                                <Grid item xs={7} className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">{number_of_table}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1">Tổng tiền bàn</Typography>
                                </Grid>
                                <Grid item xs={7} className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">{totalTablePrice}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </>
    )
}

export default BillInfo;
