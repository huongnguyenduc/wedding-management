import {Button, Container, Fab, Grid, InputAdornment, Select, Snackbar, TextField, Typography, useMediaQuery, useTheme, Backdrop, CircularProgress} from '@material-ui/core';
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

function Service() {
    const StoreData = useSelector(state => state.changeServices);
    const Services = StoreData.Services;
    const Pending = StoreData.Pending;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openInsert, setOpenInsert] = React.useState(false)
    const [sort, setSort] = useState('asc');
    const [price, setPrice] = useState({minPrice:'', maxPrice:'',apply:false, err:false})
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
        switch(sort){
            case 'asc':
                return service1.price - serivce2.price;
            case 'desc':
                return serivce2.price - service1.price;
            default:
                return true;
        }
        
    }

    const CheckPrice = (service) =>{
        if(!price.apply)
            return true;
        if(price.minPrice&&!price.maxPrice)
            return(service.price >= price.minPrice)
        if(!price.minPrice&&price.maxPrice)
            return service.price <= price.maxPrice;
        if(price.minPrice&&price.maxPrice)
            return (service.price >= price.minPrice) && (service.price <= price.maxPrice)
            
    }

    const PriceHandler =()=>{
        var minPrice = parseInt(price.minPrice);
        var maxPrice = parseInt(price.maxPrice);

        if(price.apply===true)
        {
            setPrice({...price,apply:false, err:false})
            return
        }

        if(isNaN(minPrice) && isNaN(maxPrice))
        {
            setPrice({...price,apply:false, err:true});
            setError({open:true, severity:'error', message:'Khoảng giá không hợp lệ'})
        }
        else if(minPrice<0 || maxPrice<0)
        {
            setPrice({...price,apply:false, err:true});
            setError({open:true,severity:'error', message:'Khoảng giá không hợp lệ'})
        }
        else if(!(isNaN(minPrice) || isNaN(maxPrice)))
        {
            if(minPrice <= maxPrice)
                setPrice({...price,apply:true, err:false})
            else
            {
                setError({open:true,severity:'error', message:'Khoảng giá không hợp lệ'})
                setPrice({...price,apply:false, err:true})
            } 
        }
        else
            setPrice({...price,apply:true, err:false})
        
    }

    const ChangePriceHandler =(e)=>{
        setPrice({...price, [e.target.name]: e.target.value})
    }

    const Filer =(service)=>{
        var key = keyWord.toLowerCase()
       var str = service.name.toLowerCase();
       return str.search(key)!==-1;
    }
    const scrollHandler = (event)=>{
        var header = document.querySelector(".ServiceHeader")
        if(header!=null)
        {
            header.classList.toggle(classes.HeaderScroll,window.scrollY > 80)
        }
                
    }
    useEffect(()=>{
        dispatch(GetServices())
        window.addEventListener("scroll", scrollHandler)
    },[])
    return (
        <Container className={classes.ServicePage}>
             <Backdrop open={Pending} className={classes.backdrop} onClick={(e)=>{e.stopPropagation()}}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Container spacing={3}  className={`ServiceHeader ${classes.Header}`}>
                <Grid item xs={12} sm={4} md={3} lg={3} className={`${classes.HeaderControl} ${classes.SortControl}`}>
                    <Typography  className={classes.SortLabel} >Sắp xếp:</Typography>
                    <Select
                        native
                        value={sort}
                        onChange={(e)=>setSort(e.target.value)}
                        className={classes.SelectSort}
                        variant="outlined"
                        fullWidth
                    >
                        <option value='asc'>Theo giá tăng dần</option>
                        <option value='desc'>Theo giá giảm dần</option>
                    </Select>
                </Grid>

                <Grid item xs={12} sm={5} md={4} lg={4} className={`${classes.HeaderControl} ${classes.PriceControl}`}>
                    <Typography className={classes.LabelPrice}>Giá:</Typography>
                    <TextField 
                        placeholder="Từ"
                        className={classes.tfPrice}
                        disabled={price.apply}
                        name="minPrice"
                        variant="outlined"
                        value={price.minPrice}
                        onChange={ChangePriceHandler}
                        InputProps={{
                            inputComponent:NumberFormatCustom,
                        }}
                    />
                    <Remove style={{fontSize:'3rem'}}/>
                    <TextField
                        placeholder="Đến"
                        className={classes.tfPrice}
                        disabled={price.apply}
                        name="maxPrice"
                        variant="outlined"
                        value={price.maxPrice}
                        onChange={ChangePriceHandler}
                        InputProps={{
                            inputComponent:NumberFormatCustom,
                        }}
                    />

                    <Button className={classes.btnApply} onClick={PriceHandler}>{price.apply?"HUỶ":"ÁP DỤNG"}</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} className={`${classes.HeaderControl} ${classes.SearchControl}`}>
                    <TextField
                        className={classes.TextSearch}
                        placeholder='Tìm kiếm'
                        fullWidth
                        variant="outlined"
                        onKeyDown={(e)=>{if(e.key==='Enter') {setKeyWord(e.target.value)}}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search style={{fontSize:'25px'}}/>
                              </InputAdornment>
                            ),
                          }}
                       
                    />
                </Grid>
            </Container>
            <Container maxWidth='lg' className={classes.ServicesContainer} >
                {
                    Services.filter(service=>Filer(service))
                            .filter((service)=>CheckPrice(service))
                            .sort((service1, service2)=>Compare(service1,service2))
                            .map((service)=>{
                        return (<ServiceCard key= {service.id} xs={12} sm={6} md={4} lg={4} data={service}/>)
                    })
                }
            </Container>

            <Fab color='primary' aria-label='add' variant='extended' onClick={openInsertService} className={`insertFab ${classes.InsertFab}`} classes={{label: classes.ButtonLabel }}>
                <Add style={{fontSize:'30px'}}/>
                Thêm dịch vụ
            </Fab>

            {openInsert?<ServiceDialog closeHandler={()=>setOpenInsert(false)}/>:null}
            <Snackbar open={error.open} autoHideDuration={3000} onClose={CloseAlert} className={classes.Snackbar}>
                        <Alert open={error.open} severity={error.severity} onClose={CloseAlert} >{error.message}</Alert>
            </Snackbar>
            {console.log(Status.open)}
            <Snackbar open={Status.open} autoHideDuration={3000} onClose={CloseAlert} className={classes.Snackbar}>
                        <Alert open={Status.open} severity={Status.severity} onClose={CloseAlert} >{Status.message}</Alert>
            </Snackbar>
    </Container>
    )
}

export default Service;

