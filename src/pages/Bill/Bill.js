import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { MuiThemeProvider, Typography, Tab, Tabs, Box, Container, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../components/MuiTheme';
import PropTypes from 'prop-types';
import BillPaid from './BillPaid';
import {actFetchNotPaidBillsRequest} from './../../action/notPaidBill';
import {actFetchPaidBillsRequest} from './../../action/paidBill';
import BillNotPaid from './BillNotPaid';

const useStyles = makeStyles((theme) => ({
    navigationBar: {
        backgroundColor: "#F3F7FA",
        width: "250px",
        height: "100vh",
        justifyContent: "flex-start"
    },
    content: {
        justifyContent: "flex-start",
        display: "flex",
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      height: "100%",
      flexDirection: "row",
      display: "flex"
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    title: {
      textAlign: 'center',
      height: '100px',
      lineHeight: '100px'
    },
    navigationItem: {
      height: '100px'
    },

}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Bill(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    useEffect(() => {
      props.fetchAllNotPaidBills();
      props.fetchAllPaidBills();
    }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
              <div className={classes.navigationBar}>
                  <Typography variant="h4" className={classes.title} >Hóa đơn</Typography>
                  <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  className={classes.tabs}>
                    <Tab label="Đã thanh toán" {...a11yProps(0)} className={classes.navigationItem} />
                    <Tab label="Chưa thanh toán" {...a11yProps(1)} className={classes.navigationItem} />
                  </Tabs>
              </div>
                  <Container className={classes.content}>
                    <TabPanel value={value} index={0}>
                      {props.paidBills ? <BillPaid rows={ props.paidBills } /> : <CircularProgress />}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      {props.notPaidBills ? <BillNotPaid rows={ props.notPaidBills } /> : <CircularProgress />}
                    </TabPanel >
                  </Container>
          </div>
        </MuiThemeProvider>
    );
}

const mapStateToProps = state => {
    return {
        notPaidBills: state.notPaidBills,
        paidBills: state.paidBills
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllNotPaidBills : () => {
            dispatch(actFetchNotPaidBillsRequest());
        },
        fetchAllPaidBills : () => {
            dispatch(actFetchPaidBillsRequest());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bill);