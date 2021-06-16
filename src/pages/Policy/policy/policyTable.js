import {TableContainer,Table,TableBody,Snackbar,TableRow,TableCell, Toolbar, Paper, TableHead, IconButton, Backdrop, CircularProgress } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import useStyles from "./policyStyles"
import {GetPolicy,UpdatePolicy} from "../connect"
import { TextField } from "@material-ui/core"
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';
import { AddOutlined, Brightness1, Done, Remove } from "@material-ui/icons"




function PolicyPanel() {
    const classes = useStyles();
    const [oldFine, setOldFine] = useState({id:'',fineName:'', percent:''});
    const [fine, setFine]= useState({id:'',fineName:'', percent:''});
    const [alert, setAlert] = useState({open:false, severity:'', message:''})
    const [pending, setPending] = useState(true)
    
    function CloseAlert(){
        setAlert({...alert,open:false})
    }

    function check()
    {
        return JSON.stringify(oldFine) === JSON.stringify(fine)
    }

    function ChangePercent(e)
    {
        if(e.target.value>=0)
            setFine({...fine,percent:e.target.value})
    }

    function IncreasePercent()
    {
        setFine({...fine,percent:fine.percent+1})
    }

    function DecreasePercent()
    {
        if(fine.percent-1>=0)
            setFine({...fine,percent:fine.percent-1})
        else
            setFine({...fine,percent:0})

    }

    function StatusHandler(status, data)
    {
        switch(status)
        {
            case 'INIT':{
                setOldFine(data[0])
                setFine(data[0])
                break
            }
            case "UPDATE":{
                setOldFine(fine)
                setAlert({open:true, severity:'success', message:'Cập nhật thành công'})
                break
            }
            case "ERROR":{
                setAlert({open:true, severity:'error', message:data})
                break
            }
            default:{
                break
            }
        }
        setPending(false)
    }

    function UpdateFine(){
        if(isNaN(fine.percent))
        {
            StatusHandler("ERROR", "mức phạt phải là số dương")
        }
        else
        {
            setPending(true)
            UpdatePolicy(fine, StatusHandler)
        }
       return 
    }

    function DisableHandler()
    {
        setFine({...fine,percent:0})
    }

    useEffect(()=>{
        setPending(true)
        GetPolicy(StatusHandler)
    },[])

    if(pending)
        return (
        <Backdrop open={true} className={classes.backdrop}>
            <CircularProgress color="inherit"/>
        </Backdrop>)
    else
        return(
            <Paper className={classes.policyTable}>     
                <TableContainer>
                    <Toolbar
                        className={classes.Toolbar}
                    >
                        <Typography
                        className={classes.ToolbarTitle}
                        id="tableTitle"
                        component="div"
                        >
                        QUI ĐỊNH
                        </Typography>

                    </Toolbar>
                    <Table>
                        <TableHead className={classes.TableHeader}>
                            <TableRow>
                                <TableCell   
                                    padding="default"
                                    align='center'
                                    variant='head'
                                    style={{ paddingRight:'0px'}}
                                >
                                TÊN QUI ĐỊNH
                                </TableCell>   
                                <TableCell   
                                    padding="default"
                                    align='center'
                                    variant='head'
                                    style={{ paddingRight:'0px'}}
                                >
                                MỨC PHẠT (%)
                                </TableCell>
                                <TableCell
                                    padding="default"
                                    align='center'
                                    variant='head'
                                    style={{ paddingRight:'0px'}}
                                >
                                ÁP DỤNG
                                </TableCell>
                                <TableCell
                                    padding="default"
                                    align='center'
                                    variant='head'
                                    style={{ paddingRight:'0px', width:'8%', minWidth:'50px'}}
                                >
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.TableBody}>
                            {oldFine.id&&<TableRow>
                                <TableCell
                                    align='center'
                                    className={classes.BodyRow}
                                >
                                    <Typography className={classes.NameContent}>{fine.fineName}</Typography>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    className={classes.BodyRow}
                                >
                                    <TextField
                                        value={fine.percent}
                                        onChange={ChangePercent}
                                        name='percent'
                                        type='number'
                                        inputProps = {{ min: 0, style: { textAlign: 'center' }}}
                                        InputProps={{
                                            disableUnderline:true,
                                            className:classes.PercentContent,
                                            startAdornment:<InputAdornment>
                                                <IconButton classes={{root:classes.Button,label:classes.ButtonLabel}} onClick={DecreasePercent}>
                                                    <Remove className={classes.ButtonIcon}/>
                                                </IconButton>
                                            </InputAdornment>,
                                            endAdornment:<InputAdornment>
                                            <IconButton classes={{root:classes.Button,label:classes.ButtonLabel}} onClick={IncreasePercent}>
                                                <AddOutlined className={classes.ButtonIcon}/>
                                            </IconButton>
                                        </InputAdornment>

                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    align='center'
                                    className={classes.BodyRow}
                                >
                                    <Brightness1 className={classes.ButtonIcon} style={{color: check()?oldFine.percent>0?'#08dc2cde':'#e60707':'#e4b817de'}} onDoubleClick={DisableHandler}/>
                                </TableCell>
                                <TableCell 
                                     align='center'
                                     className={classes.ControlCell}
                                >
                                        <IconButton classes={{root:classes.DoneButton, label:classes.ButtonLabel}} style={{display:check()?'none':''}} onClick={UpdateFine}>
                                            <Done className={classes.ButtonDoneIcon}/>
                                        </IconButton>
                                </TableCell>
                            </TableRow>  
                        }   
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={alert.open} autoHideDuration={3000} onClose={CloseAlert} className={classes.Snackbar}>
                    <Alert onClose={CloseAlert} severity={alert.severity}>
                    {alert.message}
                    </Alert>
                </Snackbar>
            </Paper>
        )
}

export default PolicyPanel