import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Fab } from "@material-ui/core/";
import { lightBlue } from "@material-ui/core/colors";
import { ArrowBack, AttachMoneyOutlined } from "@material-ui/icons";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "./Table";
import Service from "./OrderService/Service";
import { Link } from "react-router-dom";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "130px",
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  indicator: {
    backgroundColor: "#FC5404",
    height: "5px",
    borderRadius: 10,
  },
}));

export default function TableServiceTabBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        style={{
          position: "fixed",
          bottom: "40px",
          right: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          to={`/bill/${props.weddingId}`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AttachMoneyOutlined style={{ color: lightBlue[50] }} />
          <span
            style={{
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              marginLeft: "6px",
            }}
          >
            Thanh to??n
          </span>
        </Link>
      </Fab>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#060b26",
          position: "fixed",
          top: 80,
          left: 0,
          transition: "top 0.3s",
          zIndex: 1,
        }}
        id="appBarTable"
      >
        <Tabs
          classes={{ indicator: classes.indicator }}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Link to="/wedding">
            <IconButton edge="start" className={classes.backButton}>
              <ArrowBack style={{ color: lightBlue[50] }} />
            </IconButton>
          </Link>
          <Tab label="Th??ng tin ?????t b??n" {...a11yProps(0)} />
          <Tab label="Th??ng tin ?????t d???ch v???" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
        <Table
          weddingId={props.weddingId}
          lobbyId={props.lobbyId}
          status={props.status}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Service
          weddingId={props.weddingId}
          lobbyId={props.lobbyId}
          status={props.status}
        />
      </TabPanel>
    </div>
  );
}
