import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, Grid, Container} from '@material-ui/core/';
import NumberFormat from 'react-number-format';
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
function convertDateToStringDMYNew(date) {
    if (date == null) return;
        let day = date.substring(8, 10);
        let month = date.substring(5, 7);
        let year = date.substring(0, 4);
        let result = day + "/" +month + "/" +  year;
        return result;
}
function BillInfo(props) {
    const classes = useStyles();
    const {groomname, bridename, phone, dateOfOrganization } = props.feast;
    const totalTablePrice = props.totalTablePrice;
    const numberOfTables = props.numberOfTables;
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
                                    <Typography variant="subtitle1">{convertDateToStringDMYNew(dateOfOrganization)}</Typography>
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
                                    <Typography variant="subtitle1">{numberOfTables}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1">Tổng tiền bàn</Typography>
                                </Grid>
                                <Grid item xs={7} className={classes.billInfoItem}>
                                    <Typography variant="subtitle1">
                                        <NumberFormat value={totalTablePrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} />
                                    </Typography>
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
