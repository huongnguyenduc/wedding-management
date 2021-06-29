import { Container, Fab, Grid, InputAdornment, Snackbar, TextField, Backdrop, CircularProgress, IconButton } from '@material-ui/core';
import { Add, Search} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState} from 'react'
import ServiceCard from './ServiceCard/ServiceCard';
import useStyles from './ServiceStyles'
import { useDispatch, useSelector } from 'react-redux'
import {GetServices} from './Connect'
import {actCloseError} from '../Service/actions/actions' 
import ServiceDialog from '../Service/ServiceDialog/ServiceDialog'
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
        if (str.search(key)!==-1 || service.price == keyWord)
            return true
        else
            return false
    }

    var prevScrollpos = window.pageYOffset;

    function scrollHandler(){
        var currentScrollPos = window.pageYOffset;
        var header = document.querySelector(".ServiceHeader")
        if(header!=null)
        {
            if (prevScrollpos > currentScrollPos) {
                header.style.top = "80px";
            } else {
                header.style.top = "0px";
            }
        }
        prevScrollpos = currentScrollPos;
    }
    window.addEventListener('scroll', scrollHandler);
  
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
                {openSearch?<Grid item xs={12} sm={12} md={12} lg={12} className={classes.SearchControl} >
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
                   
                </Grid>:null}
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

