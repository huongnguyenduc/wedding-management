import {Button, Container, Fab, Grid, InputAdornment, Select, Snackbar, TextField, Typography, useMediaQuery, useTheme, Backdrop, CircularProgress, IconButton } from '@material-ui/core';
import { Add, Remove, Search} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState} from 'react'
import ServiceCard from './ServiceCard/ServiceCard';
import useStyles from './ServiceStyles'
import { useDispatch, useSelector } from 'react-redux'
import {GetServices} from './Connect'
import {actCloseError} from '../Service/actions/actions' 
import ServiceDialog from '../Service/ServiceDialog/ServiceDialog'
import NumberFormatCustom from '../Food/FormartNumber'
import { getCookie } from '../../action/Login'

function Service() {
    const StoreData = useSelector(state => state.changeServices);
    const Services = StoreData.Services;
    const Pending = StoreData.Pending;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openInsert, setOpenInsert] = React.useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [keyWord, setKeyWord] = useState('')
    const Status = StoreData.Status;
    const [error, setError] = useState({open:false,severity:'', message:''})
    const openInsertService = (e) =>
    {
        setOpenInsert(true)
    }
    const CloseAlert = ()=>{
        
        if(error.open)
            setError({...error,open:false})
        else
            dispatch(actCloseError())
    }
    

    const Compare = (service1 , serivce2) =>
    {
        return service1.price - serivce2.price;
    }


    const Filer =(service)=>{
        var key = keyWord.toLowerCase()
       var str = service.name.toLowerCase();
       return str.search(key)!==-1;
    }
  
    useEffect(()=>{
        dispatch(GetServices())
    },[])
    const privileges = JSON.parse(getCookie("privileges"))

    const canUpdateService = (permission) => permission.authority === "UPDATE_SERVICE"
    return (
        <Container className={classes.ServicePage}>
             <Backdrop open={Pending} className={classes.backdrop} onClick={(e)=>{e.stopPropagation()}}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Container maxWidth='lg' className={`ServiceHeader ${classes.Header}`}>
                <Grid item xs={8} sm={8} md={6} lg={6} className={classes.SearchControl} style={{visibility:openSearch?'visible':'hidden'}}>
                    <TextField
                        className={classes.TextSearch}
                        placeholder='Tìm kiếm'
                        fullWidth
                        variant="outlined"
                        onKeyDown={(e)=>{if(e.key==='Enter') {setKeyWord(e.target.value)}}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search style={{fontSize:'30px'}}/>
                              </InputAdornment>
                            ),
                          }}
                       
                    />
                   
                </Grid>
                <IconButton 
                    classes={{label:classes.ButtonLabel}}
                    className={classes.SearchButton}
                    onClick={()=>{setOpenSearch(!openSearch)}}
                >
                    <Search style={{fontSize:'30px'}}/>
                </IconButton>
            </Container>
            <Container maxWidth='lg' className={classes.ServicesContainer} >
                {
                    Services.filter(service=>Filer(service))
                            .sort((service1, service2)=>Compare(service1,service2))
                            .map((service)=>{
                        return (<ServiceCard key= {service.id} xs={12} sm={6} md={4} lg={4} data={service}/>)
                    })
                }
            </Container>

            {privileges.some(canUpdateService) ? <Fab color='primary' aria-label='add' variant='extended' onClick={openInsertService} className={`insertFab ${classes.InsertFab}`} classes={{label: classes.ButtonLabel }}>
                <Add style={{fontSize:'30px'}}/>
                Thêm dịch vụ
            </Fab> : <></>}

            {openInsert?<ServiceDialog closeHandler={()=>setOpenInsert(false)}/>:null}
            <Snackbar open={error.open} autoHideDuration={3000} onClose={CloseAlert} className={classes.Snackbar}>
                        <Alert open={error.open} severity={error.severity} onClose={CloseAlert} >{error.message}</Alert>
            </Snackbar>
            <Snackbar open={Status.open} autoHideDuration={3000} onClose={CloseAlert} className={classes.Snackbar}>
                        <Alert open={Status.open} severity={Status.severity} onClose={CloseAlert} >{Status.message}</Alert>
            </Snackbar>
    </Container>
    )
}

export default Service;

