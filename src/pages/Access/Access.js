import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, MuiThemeProvider, Tabs, Typography, Tab, Box, CircularProgress } from '@material-ui/core';
import theme from '../../components/MuiTheme';
import Administration from './Administration';
import Account from './Account';
import {actFetchUsersRequest} from './../../action/user';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
        component="a"
        onClick={(event) => {
            event.preventDefault();
        }}
        {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "70px"
  },
  indicator: {
    backgroundColor: '#FC5404',
    height: "5px",
    borderRadius: 10
  }
}));

function Access(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
      props.fetchAllUsers();
    }, []);

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: '#060b26' }}>   
                <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                classes={{indicator: classes.indicator}}
                >
                <LinkTab label="Quản lý phân quyền" href="/drafts"  {...a11yProps(0)} />
                <LinkTab label="Quản lý tài khoản" href="/trash" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} style={{fontSize:'13px', fontWeight:'500', color: "#fff"}}>
                <Administration />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.users ? <Account data={ props.users } /> : <CircularProgress />}
                
            </TabPanel>
            </div>
        </MuiThemeProvider>
    );
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllUsers : () => {
            dispatch(actFetchUsersRequest());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Access);
