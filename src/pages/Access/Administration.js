import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, Typography, CircularProgress, FormControl, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import theme from '../../components/MuiTheme';
import { connect } from 'react-redux'
import FeatureList from './Components/FeatureList';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AccessList from './Components/AccessList';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';


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
    formControl: {
        margin: theme.spacing(1),
        width: 180,
    },
    body: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "20px 0px 0px 0px",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    groupButton: {
        display: "flex",
        flexDirection: "column",
    },
    reverseArrow: {
        transform: "rotate(180deg)",
    },
    arrow: {
        margin: "5px 20px"
    }
}));

function Administration(props) {
    const classes = useStyles();
    useEffect(() => {
        // props.getNotPaidBill(props.match.params.weddingId);
        // props.fetchWeddingServices(props.match.params.weddingId);
        // props.fetchAllTable(props.match.params.weddingId);
    }, [])
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
        {props ? 
            <MuiThemeProvider theme={theme}>
                <div className={classes.title}>     
                    <Typography variant="h4" color="secondary">Quản Lý Phân Quyền</Typography>
                </div>
                <div className={classes.select}>     
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Tên nhóm người dùng</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={age}
                        onChange={handleChange}
                        label="Tên nhóm người dùng"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                    <div className={classes.body}>
                        <FeatureList />
                        <div className={classes.groupButton}>
                            <Button  variant="contained"  className={classes.arrow}  style={{ borderRadius: 35, backgroundColor: green[400], fontSize: "18px" }}>
                                <DoubleArrowIcon style={{ color: "#fff", fontSize: "20px", marginRight: "10px" }} />
                            </Button>
                            <Button variant="contained" className={classes.arrow} style={{ borderRadius: 35, backgroundColor: red[600], fontSize: "18px", }}>
                                <DoubleArrowIcon className={classes.reverseArrow} style={{color: "#fff", fontSize: "20px", marginRight: "10px" }}/>
                            </Button>
                        </div>
                        <AccessList />
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

export default connect(mapStateToProps, mapDispatchToProps)(Administration);
