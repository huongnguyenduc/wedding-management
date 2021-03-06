
import { CardMedia, Container, Grid, ListItem, IconButton, List, ListItemIcon, TextField, Typography, ListItemText, Button, useTheme, useMediaQuery, Dialog } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './DialogStyles'
import NumberFormatCustom from '../../Food/FormartNumber'
import { Cancel, CheckCircle, DeleteOutline, Edit, MoreHoriz, PhotoCamera } from '@material-ui/icons'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useDispatch, useSelector } from 'react-redux'
import {InsertService, UpdateService, DeleteService} from '../Connect'
import {actError} from '../actions/actions';


function ServiceDialog(props)
{
    const {data, closeHandler, edit} = props
    const dispatch = useDispatch();
    const StoreData = useSelector(state => state.changeServices);
    const Services = StoreData.Services;
    const classes = useStyles()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const [isEdit, setIsEdit] = useState((data&&!edit)?false:true)
    const [openList,setOpenList] = useState(false)
    const [ServiceData, setServiceData] = useState(data?{
        id:data.id,
        img:null,
        imgURL: data.img,
        name:data.name,
        price:data.price,
        moreInfo:data.moreInfo,
    }:{
        img:null,
        imgURl: '',
        name:'',
        price:'',
        moreInfo:'',
    });

    const HandlerChangeData =(e)=>{
        setServiceData({...ServiceData,[e.target.name]:e.target.value})
    }

    const selectedFile = (event) => { 
        if(event.target.files[0])
        {
            setServiceData({...ServiceData,img:event.target.files[0],imgURL: URL.createObjectURL(event.target.files[0])})
        }
                  
    };

    function checkExist()
    {
        const find =  Services.find(item=> item.name.toLowerCase().replace( /\s/g, '') === ServiceData.name.toLowerCase().replace( /\s/g, ''))
        if(find)
            if(find.id === ServiceData.id)
                return false;
            else
                return true;
        else 
            return false;
    }

    const CheckDetail = () =>{
        if(ServiceData.imgURL && ServiceData.name && ServiceData.price && ServiceData.moreInfo )
        {
            if(isNaN(parseInt(ServiceData.price)))
                return {value: false, message:'Gi?? c???a d???ch v??? ph???i l?? s???!'}
            else if(parseInt(ServiceData.price) < 0)
                return {value: false, message:'Gi?? c???a d???ch v??? kh??ng th??? l?? s??? ??m!'}
            else if(checkExist())
                return {value: false, message:'T??n d???ch v??? ???? ???????c s??? d???ng!'}
            else
                return {value: true, message:''}
        }
        else
            return {value: false, message:'Vui l??ng nh???p ?????y ????? th??ng tin!'}
    }

    function success()
    {
        if(data)
            setIsEdit(false)
        else
            closeHandler();
    }
    const handlerInsert = () =>
    {
        let checkResult = CheckDetail()
        if(!checkResult.value)
        {
            dispatch(actError(checkResult.message))
            return;
        }
        if(data)
        {
            dispatch(UpdateService(ServiceData, success));
           
        }
        else
        {
            dispatch(InsertService(ServiceData, success));
        }  
    }

    const DeleteHandler = () =>
    {
        const confirm = window.confirm("Th??ng tin v??? d???ch v??? s??? ???????c xo?? ho??n to??n kh???i h??? th???ng. B???n c?? mu???n ti???p t???c?");
        if(!confirm)
            return ;
        dispatch(DeleteService(data))
        setOpenList(false);
    }

    const handlerCancel =()=>
    {
        if(!data)
            closeHandler()
        setIsEdit(false);
        setServiceData(data?{
            id:data.id,
            img:null,
            imgURL: data.img,
            name:data.name,
            price:data.price,
            moreInfo:data.moreInfo,
        }:{
            img:null,
            imgURl: null,
            name:'',
            price:'',
            moreInfo:'',
        })
    }

    return(
    <Dialog c
        lassName={classes.DialogBackGround}
        open={true} 
        onClose={closeHandler} 
        scroll="body" 
        keepMounted 
        maxWidth="lg"
        fullWidth     
    >
        <Container className={classes.DialogBody} >
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet"/>
            <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={selectedFile}
            />
            <Grid item xs={12} sm={6} md={6} lg={6} className = {classes.Media}>
                {ServiceData.imgURL?<CardMedia
                    image={ServiceData.imgURL}
                    className={classes.Image}
                />:null}
                <label className={`BtnImg ${classes.BtnImg}`} htmlFor='btn-upload' >
                    {isEdit?<PhotoCamera  style={{fontSize:'50px'}}  />:null}
                </label>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.Content}>
                
                <ClickAwayListener onClickAway={()=>setOpenList(false)}>
                    <Grid className={classes.Header}>
                        <IconButton classes={{label: classes.ButtonLabel }} style={{padding:'0'}} onClick={()=>{setOpenList(!openList)}}>
                            <MoreHoriz style={{fontSize:"30px"}} />
                        </IconButton>
                        <div className={classes.ListAction} style={{display:openList?'flex':'none'}}>
                            <List component ='div'>
                                <ListItem 
                                    button 
                                    className={classes.ControlItem} 
                                    onClick={()=>{setIsEdit(true) 
                                                    setOpenList(!openList)}}>
                                    <ListItemIcon>
                                        <Edit style={{fontSize:'22px'}}/>
                                    </ListItemIcon>
                                    <ListItemText>Ch???nh s???a </ListItemText>
                                </ListItem>
                                <ListItem button className={classes.ControlItem} onClick={DeleteHandler}>
                                        <ListItemIcon>
                                            <DeleteOutline style={{fontSize:'22px'}}/>
                                        </ListItemIcon>
                                        <ListItemText> Xo?? </ListItemText>
                                    </ListItem>
                            </List>
                        </div>
                    </Grid>
                </ClickAwayListener>
                
                <Grid className={classes.GrdName}>
                    <TextField
                        disabled={!isEdit}
                        name='name'
                        id='name'
                        placeholder='T??n d???ch v???*'
                        value={ServiceData.name}  
                        onChange={HandlerChangeData} 
                        multiline 
                        fullWidth   
                        InputProps={{
                            disableUnderline:true,
                            className:classes.name
                        }}

                    />
                </Grid>
                <Grid className={classes.GrdPrice}>
                <TextField
                    disabled={!isEdit}
                    name='price'
                    id='price'
                    placeholder='Gi??*'
                    value={ServiceData.price}  
                    onChange={HandlerChangeData}
                    fullWidth
                    InputProps={{
                        inputComponent:NumberFormatCustom,
                        disableUnderline:true,
                        className:classes.price
                    }}
                />
                </Grid>
                <Grid className={classes.GrdMoreInfo}>
                    <Typography className={classes.InputLabel}>M?? t???*:</Typography>


                    <TextField
                        disabled={!isEdit}
                        name='moreInfo'
                        id='moreInfo'
                        placeholder='M?? t??? *'
                        value={ServiceData.moreInfo}  
                        onChange={HandlerChangeData}
                        fullWidth
                        multiline
                        rows={matches?5:15}
                        rowsMax={matches?10:15}
                        InputProps={{
                            disableUnderline:true,
                            className:classes.moreInfo,
                        }}
                    />
                </Grid>
                
                {
                isEdit?<Grid className={classes.Footer}>
                <Button 
                        className={classes.ControlButton}
                        startIcon={<CheckCircle style={{fontSize:'30px'}}/>}
                        onClick={handlerInsert}    
                    >HO??N T???T</Button>

                <Button 
                        className={classes.ControlButton}
                        startIcon={<Cancel style={{fontSize:'30px'}}/>}
                        onClick={handlerCancel}    
                    >HU???</Button>
                </Grid>:null}
            </Grid>      
        </Container>
    </Dialog>
    )
}

export default ServiceDialog;