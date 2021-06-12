import { CircularProgress, Container, Dialog, Fade, Grid, IconButton, Paper, Snackbar, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, Tabs, TextField, Toolbar, Tooltip, Typography} from "@material-ui/core"
import React,{useEffect, useState} from "react"
import useStyles from './Styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { Alert } from "@material-ui/lab";
import { FilterList } from "@material-ui/icons";
import ShiftTable from "./shift/shiftTable"
import PolicyTable from "./policy/policyTable"
import clsx from "clsx";


function Policy() {
    const classes = useStyles()
    const [value, setValue] = useState(1)

    function handleChange(event, newValue){
       setValue(newValue)
    }
    return(
            <Container maxWidth='lg' className={classes.PolicyContainer}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                    className={classes.Tabs}
                >
                    <Tab label="CA"/>
                    <Tab label="QUY ĐỊNH"/>

                </Tabs>                
                {value==0?<ShiftTable/>:<PolicyTable/>}
            </Container>
        
    );
}

export default Policy;

