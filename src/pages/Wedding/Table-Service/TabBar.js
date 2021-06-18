import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, IconButton } from '@material-ui/core/';
import { lightBlue } from '@material-ui/core/colors'; 
import {ArrowBack, } from '@material-ui/icons'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from './Table'
import Service from './OrderService/Service'
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  indicator: {
    backgroundColor: '#FC5404',
    height: "5px",
    borderRadius: 10
  }
}));

export default function TableServiceTabBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#060b26' }}>
        <Tabs classes={{indicator: classes.indicator}} value={value} onChange={handleChange} aria-label="simple tabs example">
          <Link to="/wedding">
            <IconButton
              edge="start"
              className={classes.backButton}
            >
              <ArrowBack style={{ color: lightBlue[50] }}/>
            </IconButton>     
          </Link>
          <Tab label="Thông tin đặt bàn" {...a11yProps(0)} />
          <Tab label="Thông tin đặt dịch vụ" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
        <Table weddingId={props.weddingId} lobbyId={props.lobbyId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Service weddingId={props.weddingId} lobbyId={props.lobbyId} />
      </TabPanel>
    </div>
  );
}